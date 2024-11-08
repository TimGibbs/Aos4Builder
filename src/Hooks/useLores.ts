import { useMemo } from "react";
import Lore from "../Types/DataTypes/Lore";
import lores from "../Data/Lores";
import useLoreAbilities from "./useLoreAbilites";
import { EnrichedAbility } from "../Types/DataTypes/Ability";
import useKeywords from "./useKeywords";

export type LoreType = "prayer" | "spell" | "summon" | null

export interface EnrichedLore extends Lore {
    abilities : EnrichedAbility[]
    loreType : LoreType
} 

export const useLores = () => {
    const lore_abilities = useLoreAbilities()
    const { common }  = useKeywords();
    const memo = useMemo(()=>lores.map(o=>enrich(o, lore_abilities, common.prayer, common.spell, common.summon)),[lore_abilities,common])
    return memo;
}

const enrich = (lore : Lore, loreAbilities: EnrichedAbility[], prayerKey : string, spellKey : string, summonKey : string) : EnrichedLore => {
    const abilities = loreAbilities.filter(o=>o.loreId && o.loreId === lore.id);
    const loreType : LoreType = abilities.every(o=>o.keywords.includes(summonKey)) ? "summon" 
    : abilities.every(o=>o.keywords.includes(prayerKey)) ? "prayer"
    : abilities.every(o=>o.keywords.includes(spellKey)) ? "spell" : null;
    return {...lore, abilities, loreType}
}

export default useLores;