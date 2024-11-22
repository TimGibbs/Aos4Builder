import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import List, { defaultList } from '../Types/ListTypes/List';
import { v4 as uuidV4 } from 'uuid'
import Regiment from '../Types/ListTypes/Regiment';
import Unit, { defaultUnit } from '../Types/ListTypes/Unit';
import useSavedLists from './useSavedLists';
import RegimentItem from '../Types/ListTypes/RegimentItem';
import { useData } from './useData';
import { EnrichedWarscroll, Faction, Formation, Lore } from '../Types/DataTypes/AllDataTypes';

interface ListContextType {
  list: List
  allListUnits: Unit[]
  allListWarscrollIds: string[]
  saveList: () => void;
  setName: (name: string) => void;
  setList: (newData: List) => void;
  updateList: (updateList: Partial<List>) => void;
  setFaction: (faction: Faction | null) => void;
  setFormation: (formation: Formation | null) => void;
  setRegiment: (regiment: Regiment) => void;
  addRegiment: (regiment: Regiment) => void;
  setTerrain: (unit: Unit | null) => void;
  setPrayerLore: (warscroll: Lore | null) => void;
  setSpellLore: (warscroll: Lore | null) => void;
  setManifestationLore: (warscroll: Lore | null) => void;
}

// Create a default context
const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider: React.FC<{ children: ReactNode, value: List }> = ({ children, value }) => {
  const { updateList } = useSavedLists();
  const [list, setListState] = useState<List>(value);
  const data = useData();

  useEffect(() => console.log(list), [list]);

  const allListUnits: Unit[] = useMemo(() => [...list.auxiliaries,
  ...list.regiments.flatMap(o => o.regimentItems.flatMap(p => p.units)),
  ...list.regiments.filter(o => !!o.leader).map(o => o.leader!)]
    , [list])

  const allListWarscrollIds: string[] = useMemo(() => [...new Set<string>(allListUnits.map(p => p.id))], [allListUnits])

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
    updateListLocal({ name: name })
  }

  const setFaction = (faction: Faction | null) => {
    updateListLocal({ ...defaultList(), name: list.name, id: list.id, factionId: faction?.id, auxiliaries: [] });
    if (faction?.rosterFactionKeywordRequiredGeneralWarscrollId) {
    const general = data.warscrolls[faction?.rosterFactionKeywordRequiredGeneralWarscrollId];
    setRegimentLeader(0, general, true);
    }
  };

  const setRegiment = (regiment: Regiment) => {
    const regiments = [...list.regiments];
    regiments[regiment.id] = regiment;
    updateListLocal({ regiments: regiments });
  };

  const addRegiment = (regiment: Regiment) => {
    const r = { ...regiment, id: list.regiments.length };
    const regiments = [...list.regiments, r];
    updateListLocal({ regiments: regiments });
  };

  const setRegimentLeader = (regimentId: number, warscroll: EnrichedWarscroll, isFixed: boolean = false) => {
    const regiment = list.regiments[regimentId];
    const items: RegimentItem[] = warscroll.regimentOptionIds?.map((o, i) => ({ units: [], warscrollRegimentOptionId: o, id: uuidV4() })) ?? [];
    const unit: Unit = { ...defaultUnit(), warscrollId: warscroll.id }
    setRegiment({ ...regiment, leader: unit, regimentItems: items, fixedLeader: isFixed })
  };

  const setTerrain = (unit: Unit | null) => {
    updateListLocal({ terrain: unit });
  }
  const setPrayerLore = (lore: Lore | null) => {
    updateListLocal({ prayerLoreId: lore?.id });
  }
  const setSpellLore = (lore: Lore | null) => {
    updateListLocal({ spellLoreId: lore?.id });
  }
  const setManifestationLore = (lore: Lore | null) => {
    updateListLocal({ manifestationLoreId: lore?.id });
  }

  const setFormation = (formation: Formation | null) => {
    updateListLocal({ formationId: formation?.id });
  }

  return (
    <ListContext.Provider value={{
      list, allListUnits, allListWarscrollIds, saveList, setName, setList, updateList: updateListLocal, setFaction, setFormation,
      setRegiment, addRegiment,
      setTerrain, setPrayerLore, setSpellLore, setManifestationLore
    }}>
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