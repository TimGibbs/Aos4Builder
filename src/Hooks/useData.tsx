import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import Ability, { EnrichedAbility } from '../Types/DataTypes/Ability';
import WarscrollAbilityKeyword from '../Types/DataTypes/WarscrollAbilityKeyword';
import warscroll_abilities from '../Data/WarscrollAbilities';
import warscroll_ability_keywords from '../Data/WarscrollAbilityKeywords';
import WarscrollWeapon, { EnrichedWarscrollWeapon } from '../Types/DataTypes/WarscrollWeapon';
import WarscrollWeaponWeaponAbility from '../Types/DataTypes/WarscrollWeaponWeaponAbility';
import warscroll_weapons from '../Data/WarscrollWeapons';
import warscroll_weapon_weapon_abilities from '../Data/WarscrollWeaponWeaponAbilities';
import { WarscrollKeywordRequirement } from '../Types/DataTypes/WarscrollKeywordRequirement';
import WarscrollRegimentOption, { EnrichedWarscrollRegimentOptions } from '../Types/DataTypes/WarscrollRegimentOptions';
import warscroll_regiment_options from '../Data/WarscrollRegimentOptions';
import warscroll_regiment_option_excluded_keywords from '../Data/WarscrollRegimentOptionExcludedKeyword';
import warscroll_regiment_option_required_keywords from '../Data/WarscrollRegimentOptionRequiredKeyword';
import Warscroll, { EnrichedWarscroll } from '../Types/DataTypes/Warscroll';
import warscroll_keywords from '../Data/WarscrollKeywords';
import warscrolls from '../Data/Warscrolls';
import convertArrayToRecord from '../Logic/converArrayToRecord';
import weapon_abilities from '../Data/WeaponAbilities';
import Rule from '../Types/DataTypes/Rule';
import LoreAbilityKeyword from '../Types/DataTypes/LoreAbilityKeyword';
import lore_abilities from '../Data/LoreAbilities';
import lore_ability_keywords from '../Data/LoreAbilityKeywords';
import Lore, { EnrichedLore, LoreType } from '../Types/DataTypes/Lore';
import lores from '../Data/Lores';
import FormationAbilityKeyword from '../Types/DataTypes/FormationAbilityKeyword';
import formation_abilities from '../Data/FormationAbilities';
import formation_ability_keywords from '../Data/FormationAbilityKeywords';
import Formation, { EnrichedFormation } from '../Types/DataTypes/Formation';
import formations from '../Data/Formations';
import AbilityKeyword from '../Types/DataTypes/AbilityKeyword';
import abilities from '../Data/Abilities';
import ability_keywords from '../Data/AbilityKeywords';
import AbilityGroupRequiredWarscroll from "../Types/DataTypes/AbilityGroupRequiredWarscroll";
import AbilityGroup, { EnrichedAbilityGroup } from '../Types/DataTypes/AbilityGroup';
import ability_groups from '../Data/AbilityGroups';
import ability_group_required_warscrolls from '../Data/AbilityGroupRequiredWarscroll';
import warscroll_faction_keywords from '../Data/WarscrollFactionKeywords';
import Faction, { EnrichedFaction } from '../Types/DataTypes/Faction';
import WarscrollFactionKeyword from '../Types/DataTypes/WarcrollFactionKeyword';
import factions from '../Data/Factions';
import keywords from '../Data/Keywords';
import Keyword from '../Types/DataTypes/Keyword';


interface CommonKeywords {
  unique: string;
  hero: string
  prayer: string
  spell: string
  summon: string
  manifestation: string
  terrain: string
  unlimited: string
  ward3: string
  ward4: string
  ward5: string
  ward6: string
}

interface DataContextReturn {
  warscrollAbilities: Record<string, EnrichedAbility>
  warscrollWeapons: Record<string, EnrichedWarscrollWeapon>
  warscrollRegimentOptions: Record<string, EnrichedWarscrollRegimentOptions>
  warscrolls: Record<string, EnrichedWarscroll>
  weaponAbilities: Record<string, Rule>
  loreAbilities: Record<string, EnrichedAbility>
  lores : Record<string,EnrichedLore>
  formationAbilities : Record<string,EnrichedAbility>
  formations : Record<string,EnrichedFormation>
  abilities: Record<string, EnrichedAbility>
  abilityGroups: Record<string, EnrichedAbilityGroup>
  commonAbilityGroups: EnrichedAbilityGroup[]
  factions: Record<string, EnrichedFaction>
  keywords: Record<string, Keyword>
  commonKeywords: CommonKeywords
  allAbilities : Record<string,EnrichedAbility>
}

// Create a default context
export const DataContext = createContext<DataContextReturn | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


  const value = useMemo(()=>{
    console.log("generating data");

    let unique: string = "";
        let hero: string = "";
        let prayer: string = "";
        let spell: string = "";
        let summon: string = ""
        let manifestation: string = "";
        let terrain: string = ""
        let unlimited: string = ""
        let ward3: string = ""
        let ward4: string = ""
        let ward5: string = ""
        let ward6: string = ""

        const dictionary: Record<string, Keyword> = {};
        keywords.forEach(o => {
            if (o.name === "Prayer") prayer = o.id
            if (o.name === "Spell") spell = o.id
            if (o.name === "Summon") summon = o.id
            if (o.name === "Manifestation") manifestation = o.id
            if (o.name === "Unique") unique = o.id
            if (o.name === "Hero") hero = o.id
            if (o.name === "Faction Terrain") terrain = o.id
            if (o.name === "Unlimited") unlimited = o.id
            if (o.name === "Ward (3+)") ward3 = o.id
            if (o.name === "Ward (4+)") ward4 = o.id
            if (o.name === "Ward (5+)") ward5 = o.id
            if (o.name === "Ward (6+)") ward6 = o.id
            dictionary[o.id] = o;
        })

    const warscrollAbilities = convertArrayToRecord(warscroll_abilities.map(o => enrichWarscrollAbility(o, warscroll_ability_keywords)));
    const warscrollWeapons = convertArrayToRecord(warscroll_weapons.map(o => enrichWarscrollWeapon(o, warscroll_weapon_weapon_abilities)));
    const warscrollregimentOptions = convertArrayToRecord(warscroll_regiment_options.map(o => enrichWarscrollRegiment(o, warscroll_regiment_option_excluded_keywords, warscroll_regiment_option_required_keywords)));
    const warscollsa = convertArrayToRecord(warscrolls.map(o => enrichWarscroll(o, warscroll_abilities, warscroll_regiment_options, warscroll_weapons, unique, hero, terrain, manifestation)));
    const weaponAbilities = convertArrayToRecord(weapon_abilities);
  
    const loreAbilities = convertArrayToRecord(lore_abilities.map(o => enrichLoreAbility(o, lore_ability_keywords)));
    const loresa = convertArrayToRecord(lores.map(o=>enrichLore(o, Object.values(loreAbilities), prayer, spell, summon)));
  
    const formationAbilities = convertArrayToRecord(formation_abilities.map(o => enrichFormationAbility(o, formation_ability_keywords)));
    const formationsa = convertArrayToRecord(formations.map(o => enrichFormation(o, formation_abilities)));
  
    const abilitiesa = convertArrayToRecord(abilities.map(o=>enrichAbility(o,ability_keywords)));
    const abilityGroups = convertArrayToRecord(ability_groups.map(o=>enrichAbilityGroup(o,abilities,ability_group_required_warscrolls)));
    const commonAbilityGroups = Object.values(abilityGroups).filter(g=>!g.abilityGroupType && g.factionId===null && g.name!=="Spearhead Core Abilities")
    const factionsa = convertArrayToRecord(factions.map(o=>enrichFaction(o, formations, warscroll_faction_keywords, lores, ability_groups)));

    return {
      warscrollAbilities,
      warscrollWeapons,
      warscrollRegimentOptions: warscrollregimentOptions,
      warscrolls: warscollsa,
      weaponAbilities,
      loreAbilities,
      lores: loresa,
      formationAbilities,
      formations: formationsa,
      abilities: abilitiesa,
      abilityGroups, 
      commonAbilityGroups,
      factions : factionsa,
      keywords : dictionary,
      allAbilities : {...warscrollAbilities, ...loreAbilities, ...formationAbilities, ...abilitiesa},
      commonKeywords: { unique, hero, prayer, spell, summon, manifestation, terrain, unlimited, ward3, ward4, ward5, ward6 }
    }
  }, []);



  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

const enrichWarscrollAbility = (warscrollAbility: Ability, warscroll_ability_keywords: WarscrollAbilityKeyword[]): EnrichedAbility => {
  const keywords = warscroll_ability_keywords.filter(o => o.warscrollAbilityId === warscrollAbility.id).map(o => o.keywordId);
  return { ...warscrollAbility, keywords }
}

const enrichWarscrollWeapon = (warscrollWeapon: WarscrollWeapon, warscroll_weapon_weapon_abilities: WarscrollWeaponWeaponAbility[]): EnrichedWarscrollWeapon => {
  const weaponAbilities = warscroll_weapon_weapon_abilities.filter(o => o.warscrollWeaponId === warscrollWeapon.id).map(o => o.weaponAbilityId);
  return { ...warscrollWeapon, weaponAbilities }
}

const enrichWarscrollRegiment = (regimentOption: WarscrollRegimentOption, warscroll_regiment_option_excluded_keywords: WarscrollKeywordRequirement[], warscroll_regiment_option_required_keywords: WarscrollKeywordRequirement[]): EnrichedWarscrollRegimentOptions => {
  const excluded = warscroll_regiment_option_excluded_keywords.filter(o => o.warscrollRegimentOptionId === regimentOption.id).map(o => o.keywordId);
  const required = warscroll_regiment_option_required_keywords.filter(o => o.warscrollRegimentOptionId === regimentOption.id).map(o => o.keywordId);
  return { ...regimentOption, excluded, required }
}

const enrichWarscroll = (warscroll: Warscroll, abilitiesArray: Ability[], options: WarscrollRegimentOption[], weaponsArray: WarscrollWeapon[], uniqueKey: string, heroKey: string, terrainKey: string, manifestationKey: string): EnrichedWarscroll => {
  const unitKeywords = warscroll_keywords.filter(o => o.warscrollId === warscroll.id).map(o => o.keywordId);
  const regimentOptionIds = options.filter(o => o.warscrollId === warscroll.id).map(o => o.id);
  const abilityIds = abilitiesArray.filter(o => o.warscrollId && o.warscrollId === warscroll.id).map(o => o.id);
  const weaponIds = weaponsArray.filter(o => o.warscrollId === warscroll.id).sort((a, b) => b.type.localeCompare(a.type)).map(o => o.id);
  const isUnique = unitKeywords.includes(uniqueKey);
  const isHero = unitKeywords.includes(heroKey);
  const isTerrain = unitKeywords.includes(terrainKey);
  const isManifestation = unitKeywords.includes(manifestationKey);
  return { ...warscroll, keywords: unitKeywords, regimentOptionIds, abilityIds, weaponIds, isUnique, isHero, isTerrain, isManifestation }
}

const enrichLoreAbility = (loreAbility: Ability, lore_ability_keywords: LoreAbilityKeyword[]): EnrichedAbility => {
  const keywords = lore_ability_keywords.filter(o => o.loreAbilityId === loreAbility.id).map(o => o.keywordId);
  return { ...loreAbility, keywords }
}

const enrichLore = (lore : Lore, loreAbilities: EnrichedAbility[], prayerKey : string, spellKey : string, summonKey : string) : EnrichedLore => {
  const abilities = loreAbilities.filter(o=>o.loreId && o.loreId === lore.id);
  const loreType : LoreType = abilities.every(o=>o.keywords.includes(summonKey)) ? "summon" 
  : abilities.every(o=>o.keywords.includes(prayerKey)) ? "prayer"
  : abilities.every(o=>o.keywords.includes(spellKey)) ? "spell" : null;
  return {...lore, abilityIds: abilities.map(o=>o.id), loreType}
}

const enrichFormationAbility = (formationAbility: Ability, formation_ability_keywords : FormationAbilityKeyword []): EnrichedAbility => {
  const keywords = formation_ability_keywords.filter(o => o.battleFormationRuleId === formationAbility.id).map(o => o.keywordId);
  return { ...formationAbility, keywords }
}

const enrichFormation = (formation: Formation, formationAbilities: Ability[]): EnrichedFormation => {
  const abilityIds = formationAbilities.filter(o => o.battleFormationId && o.battleFormationId === formation.id).map(o=>o.id);
  return { ...formation, abilityIds }
}

const enrichAbility = (ability: Ability, ability_keywords: AbilityKeyword[]): EnrichedAbility => {
  const keywords = ability_keywords.filter(o => o.abilityId === ability.id).map(o => o.keywordId);
  return { ...ability, keywords }
}

const enrichAbilityGroup = (abilityGroup: AbilityGroup, abilitiesArray: Ability[], abilityGroupRequiredWarscrolls: AbilityGroupRequiredWarscroll[]): EnrichedAbilityGroup => {
  const abilityIds = abilitiesArray.filter(o => o.abilityGroupId && o.abilityGroupId === abilityGroup.id).map(o=>o.id);
  const warscrollIds = abilityGroupRequiredWarscrolls.filter(o => o.abilityGroupId === abilityGroup.id).map(o => o.warscrollId);
  return { ...abilityGroup, abilityIds, warscrollIds }
}

const enrichFaction = (faction: Faction, formations: Formation[], warscroll_faction_keywords : WarscrollFactionKeyword[], lores: Lore[], ability_groups: AbilityGroup[]): EnrichedFaction => {
  const formationIds = formations.filter(o => o.factionId && o.factionId === faction.id).map(o=>o.id);
  const warscrollIds = warscroll_faction_keywords.filter(o => o.factionKeywordId === faction.id).map(o=>o.warscrollId)
  const loreIds = lores.filter(o => o.factionId && o.factionId === faction.id).map(o=>o.id);
  const abilityGroupIds = ability_groups.filter(o => o.factionId === faction.id).map(o=>o.id);
  return { ...faction, formationIds, warscrollIds, loreIds, abilityGroupIds }
}

export const useData = (): DataContextReturn => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};