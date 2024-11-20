import React, { createContext, useContext, ReactNode } from 'react';
import Ability, { EnrichedAbility } from '../Types/DataTypes/Ability';
import WarscrollAbilityKeyword from '../Types/DataTypes/WarscrollAbilityKeyword';
import warscroll_abilities from '../Data/WarscrollAbilities';
import warscroll_ability_keywords from '../Data/WarscrollAbilityKeywords';
import WarscrollWeapon, { EnrichedWarscrollWeapon } from '../Types/DataTypes/WarscrollWeapon';
import WarscrollWeaponWeaponAbility from '../Types/DataTypes/WarscrollWeaponWeaponAbility';
import warscroll_weapons from '../Data/WarscrollWeapons';
import warscroll_weapon_weapon_abilities from '../Data/WarscrollWeaponWeaponAbilities';
import { WarscrollKeywordRequirement } from '../Types/DataTypes/WarscrollKeywordRequirement';
import WarscrollRegimentOption from '../Types/DataTypes/WarscrollRegimentOptions';
import { EnrichedWarscrollRegimentOptions } from './useWarscrollRegimentOptions';
import warscroll_regiment_options from '../Data/WarscrollRegimentOptions';
import warscroll_regiment_option_excluded_keywords from '../Data/WarscrollRegimentOptionExcludedKeyword';
import warscroll_regiment_option_required_keywords from '../Data/WarscrollRegimentOptionRequiredKeyword';
import Warscroll, { EnrichedWarscroll } from '../Types/DataTypes/Warscroll';
import warscroll_keywords from '../Data/WarscrollKeywords';
import warscrolls from '../Data/Warscrolls';
import useKeywords from './useKeywords';
import convertArrayToRecord from '../Logic/converArrayToRecord';
import weapon_abilities from '../Data/WeaponAbilities';
import Rule from '../Types/DataTypes/Rule';
import LoreAbilityKeyword from '../Types/DataTypes/LoreAbilityKeyword';
import lore_abilities from '../Data/LoreAbilities';
import lore_ability_keywords from '../Data/LoreAbilityKeywords';
import Lore, { EnrichedLore, LoreType } from '../Types/DataTypes/Lore';
import lores from '../Data/Lores';

interface DataContextReturn {
  warscrollAbilities: Record<string, EnrichedAbility>
  warscrollWeapons: Record<string, EnrichedWarscrollWeapon>
  warscrollregimentOptions: Record<string, EnrichedWarscrollRegimentOptions>
  warscrolls: Record<string, EnrichedWarscroll>
  weaponAbilities: Record<string, Rule>
  loreAbilities: Record<string, EnrichedAbility>
  lores : Record<string,EnrichedLore>
}

// Create a default context
const DataContext = createContext<DataContextReturn | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const { common } = useKeywords();

  const warscrollAbilities = convertArrayToRecord(warscroll_abilities.map(o => enrichWarscrollAbility(o, warscroll_ability_keywords)));
  const warscrollWeapons = convertArrayToRecord(warscroll_weapons.map(o => enrichWarscrollWeapon(o, warscroll_weapon_weapon_abilities)));
  const warscrollregimentOptions = convertArrayToRecord(warscroll_regiment_options.map(o => enrichWarscrollRegiment(o, warscroll_regiment_option_excluded_keywords, warscroll_regiment_option_required_keywords)));
  const warscollsa = convertArrayToRecord(warscrolls.map(o => enrichWarscroll(o, warscroll_abilities, warscroll_regiment_options, warscroll_weapons, common.unique, common.hero, common.terrain, common.manifestation)));
  const weaponAbilities = convertArrayToRecord(weapon_abilities);

  const loreAbilities = convertArrayToRecord(lore_abilities.map(o => enrichLoreAbility(o, lore_ability_keywords)));
  const loresa = convertArrayToRecord(lores.map(o=>enrichLore(o, Object.values(loreAbilities), common.prayer, common.spell, common.summon)))
  return (
    <DataContext.Provider value={{
      warscrollAbilities,
      warscrollWeapons,
      warscrollregimentOptions,
      warscrolls: warscollsa,
      weaponAbilities,
      loreAbilities,
      lores:loresa
    }}>
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
export const useData = (): DataContextReturn => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};