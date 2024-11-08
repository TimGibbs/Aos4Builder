import { useMemo } from "react";
import Ability, { EnrichedAbility } from "../Types/DataTypes/Ability";
import lore_abilities from "../Data/LoreAbilities";
import lore_ability_keywords from "../Data/LoreAbilityKeywords";

export const useLoreAbilities = () => {

    const memo = useMemo(()=>lore_abilities.map(o=>enrich(o)),[])
    return memo;
}

const enrich = (loreAbility : Ability) : EnrichedAbility => {
    const keywords = lore_ability_keywords.filter(o=>o.loreAbilityId === loreAbility.id).map(o=>o.keywordId);
    return {...loreAbility, keywords}
}

export default useLoreAbilities;