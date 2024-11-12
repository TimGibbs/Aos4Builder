import { useMemo } from "react";
import Ability, { EnrichedAbility } from "../Types/DataTypes/Ability";
import lore_abilities from "../Data/LoreAbilities";
import lore_ability_keywords from "../Data/LoreAbilityKeywords";
import useWarscrolls, { EnrichedWarscroll } from "./useWarscrolls";

export const useLoreAbilities = () => {
    const {warscrolls} = useWarscrolls();
    const memo = useMemo(()=>lore_abilities.map(o=>enrich(o, warscrolls)),[warscrolls])
    return memo;
}

const enrich = (loreAbility : Ability, warscrolls:EnrichedWarscroll[]) : EnrichedAbility => {
    const warscroll = warscrolls.find(o=>o.id===loreAbility.linkedWarscrollId)
    const keywords = lore_ability_keywords.filter(o=>o.loreAbilityId === loreAbility.id).map(o=>o.keywordId);
    return {...loreAbility, keywords, warscroll}
}

export default useLoreAbilities;