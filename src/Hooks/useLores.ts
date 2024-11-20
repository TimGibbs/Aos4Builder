import { useMemo } from "react";
import Lore, { EnrichedLore, LoreType } from "../Types/DataTypes/Lore";
import lores from "../Data/Lores";
import useLoreAbilities from "./useLoreAbilites";
import { EnrichedAbility } from "../Types/DataTypes/Ability";
import useKeywords from "./useKeywords";

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
    return {...lore, abilities, abilityIds: abilities.map(o=>o.id), loreType}
}

export default useLores;