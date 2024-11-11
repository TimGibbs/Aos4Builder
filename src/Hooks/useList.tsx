import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import List, { defaultList } from '../Types/ListTypes/List';
import { v4 as uuidV4} from 'uuid'
import Faction from '../Types/DataTypes/Faction';
import Regiment from '../Types/ListTypes/Regiment';
import Warscroll from '../Types/DataTypes/Warscroll';
import Lore from '../Types/DataTypes/Lore';
import Unit, { defaultUnit } from '../Types/ListTypes/Unit';
import Formation from '../Types/DataTypes/Formation';
import useSavedLists from './useSavedLists';
import RegimentItem from '../Types/ListTypes/RegimentItem';
import useWarscrolls, { EnrichedWarscroll } from './useWarscrolls';

interface ListContextType {
    list: List
    allListUnits: Unit[]
    allListWarscrollIds: string[]
    saveList: ()=>void;
    setName: (name: string) => void;
    setList: (newData: List) => void;
    updateList: (updateList: Partial<List>) => void;
    setFaction: (faction: Faction | null) => void;
    setFormation: (formation: Formation | null) => void;
    setRegiment: (regiment: Regiment) => void;
    addRegiment: (regiment: Regiment) => void;
    setRegimentLeader: (regimentId: number, warscroll:EnrichedWarscroll) => void;
    addRegimentUnit: (regimentId: number, regimentItemId: string, index: number, warscroll:Warscroll) => void;
    removeRegimentUnit: (regimentId: number, regimentItemId: string, index: number) => void;
    reinforceRegimentUnit: (regimentId: number, regimentItemId: string, unitId:string) => void;
    setUnitArtifact: (unitId:string, abilityId:string | null) => void;
    setUnitTrait: (unitId:string, abilityId:string | null) => void;
    setTerrain: (unit : Unit | null) => void;
    setPrayerLore: (warscroll : Lore | null) => void;
    setSpellLore: (warscroll : Lore | null) => void;
    setManifestationLore: (warscroll : Lore | null) => void;
  }
  
  // Create a default context
  const ListContext = createContext<ListContextType | undefined>(undefined);
  
  export const ListProvider: React.FC<{ children: ReactNode, value:List }> = ({ children, value }) => {
    const { updateList } = useSavedLists();
    const [list, setListState] = useState<List>(value);
    const warscrolls = useWarscrolls();
  
    useEffect(()=>console.log(list),[list]);

    const allListUnits : Unit[] = useMemo(()=>[...list.auxiliaries, 
      ...list.regiments.flatMap(o=> o.regimentItems.flatMap(p=>p.units)), 
      ...list.regiments.filter(o => !!o.leader).map(o=>o.leader!) ]
      ,[list])

    const allListWarscrollIds : string[] = useMemo(()=>[...new Set<string>(allListUnits.map(p=>p.id))],[allListUnits])

    const saveList = () => {
      updateList(list);
    }

    const setList = (newData: List) => {
      setListState(newData);
    };

    const updateListLocal = (updatedList: Partial<List>) => {
        setListState(p => ({ ...p, ...updatedList }));
      };

    const setName = (name: string) => {
      updateListLocal({name:name})
    }

    const setFaction = (faction: Faction| null) => {
        updateListLocal({...defaultList(), name:list.name, id:list.id, factionId:faction?.id, auxiliaries:[] });
        const general = warscrolls.find(o=>o.id===faction?.rosterFactionKeywordRequiredGeneralWarscrollId);
        if(faction?.rosterFactionKeywordRequiredGeneralWarscrollId && general){
            setRegimentLeader(0, general, true);
        }
      };

    const setRegiment = (regiment: Regiment) => {
        const regiments = [...list.regiments];
        regiments[regiment.id] = regiment;
        updateListLocal({regiments:regiments});
      };

    const addRegiment = (regiment: Regiment) => {
        const r = { ...regiment, id:list.regiments.length};
        const regiments = [...list.regiments, r];
        updateListLocal({regiments:regiments});
      };

    const setRegimentLeader = (regimentId: number, warscroll:EnrichedWarscroll, isFixed : boolean = false) => {
        const regiment = list.regiments[regimentId];
        const items : RegimentItem[] = warscroll.regimentOptions.map((o,i)=>({units:[], warscrollRegimentOptionId:o.id, id: uuidV4()}));
        const unit : Unit = {...defaultUnit(), warscrollId:warscroll.id}
        setRegiment({...regiment, leader:unit, regimentItems: items, fixedLeader:isFixed})
      };

    const addRegimentUnit = (regimentId: number, regimentItemId: string, index: number, warscroll:Warscroll) => {
        const regiment = list.regiments[regimentId];
        const item = regiment.regimentItems.find(o=>o.id=== regimentItemId)!;
        const temp = [...item.units];
        const unit : Unit = {...defaultUnit(), warscrollId:warscroll.id}
        if(temp.length<= index){
            temp.push(unit);
        } else {
            temp[index] = unit;
        }
        const r = {...regiment} 
        item.units = temp;

        setRegiment(r)
      };

    const reinforceRegimentUnit = (regimentId: number, regimentItemId: string, unitId:string) => {
        const regiment = list.regiments[regimentId];
        const r = {...regiment} 
        if(regimentItemId === "" && regiment.leader){
          const leader = {...regiment.leader ?? null, reinforced:!regiment.leader?.reinforced}
          const r = {...regiment} 
          r.leader = leader
          setRegiment(r)
        } 
        else {
          const item = regiment.regimentItems.find(o=>o.id === regimentItemId)!;
          const temp = [...item.units];
          
          const i = temp.findIndex(x=>x.id===unitId);
  
          const unit : Unit = {...temp[i], reinforced:!temp[i].reinforced}
          temp[i] = unit;
          
          
          item.units = temp;
  
          setRegiment(r)
        }
      };
    
    const setUnitArtifact = (unitId:string, abilityId:string | null) => {
      const x = list.regiments.filter(o=>o.leader?.id===unitId || o.regimentItems.some(o=>o.units.some(p=>p.id===unitId)))[0]
      if(unitId === x.leader?.id){
        const n : Unit = {...x.leader,artifactId:abilityId}
        const r : Regiment= {...x, leader:n}
        setRegiment(r);
        return;
      }

      const item = x.regimentItems.filter((o=>o.units.some(p=>p.id===unitId)))[0];
      const temp = [...item.units];
          
      const i = temp.findIndex(x=>x.id===unitId);
      const unit : Unit = {...temp[i], artifactId:abilityId}
      temp[i] = unit;


      const r = x.regimentItems.find(o=>o.id=== item.id);
      if(r) r.units = temp;
  
      setRegiment(x)
    };
    const setUnitTrait = (unitId:string, abilityId:string | null) => {

      const x = list.regiments.filter(o=>o.leader?.id===unitId || o.regimentItems.some(o=>o.units.some(p=>p.id===unitId)))[0]

      if(unitId === x.leader?.id){
        const n : Unit = {...x.leader,heroicTraitId:abilityId}
        const r : Regiment = {...x, leader:n}
        setRegiment(r);
        return;
      }
      
      const item = x.regimentItems.filter((o=>o.units.some(p=>p.id===unitId)))[0];
      const temp = [...item.units];
          
      const i = temp.findIndex(x=>x.id===unitId);
      const unit : Unit = {...temp[i], heroicTraitId:abilityId}
      temp[i] = unit;

      const r = x.regimentItems.find(o=>o.id=== item.id);
      if(r) r.units = temp;
  
      setRegiment(x)
    };

    
    const removeRegimentUnit = (regimentId: number, regimentItemId: string, index: number) => {
        const regiment = list.regiments[regimentId];
        const item = regiment.regimentItems.find(o=>o.id === regimentItemId)!;
        const temp = [...item.units];
        temp.splice(index, 1);
        const r = {...regiment} 
        item.units = temp;

        setRegiment(r)
      };

    const setTerrain = (unit : Unit | null) => {
      updateListLocal({terrain:unit});
    }
    const setPrayerLore = (lore : Lore | null) => {
      updateListLocal({prayerLoreId: lore?.id});
    }
    const setSpellLore = (lore : Lore | null) => {
      updateListLocal({spellLoreId: lore?.id});
    }
    const setManifestationLore = (lore : Lore | null) => {
      updateListLocal({manifestationLoreId: lore?.id});
    }

    const setFormation = (formation : Formation | null) => {
      updateListLocal({formationId:formation?.id});
    }

    return (
      <ListContext.Provider value={{ list, allListUnits, allListWarscrollIds, saveList, setName, setList, updateList: updateListLocal, setFaction, setFormation,
        setRegiment, addRegiment, 
        setRegimentLeader, addRegimentUnit, removeRegimentUnit, reinforceRegimentUnit, setUnitArtifact, setUnitTrait,
        setTerrain, setPrayerLore, setSpellLore, setManifestationLore }}>
        {children}
      </ListContext.Provider>
    );
  };
  
  export const useList = (): ListContextType => {
    const context = useContext(ListContext);
    if (!context) {
      throw new Error('useList must be used within a ListProvider');
    }
    return context;
  };