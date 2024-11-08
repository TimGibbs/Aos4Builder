import { useMemo } from "react";
import warscroll_abilities from "../Data/WarscrollAbilities";
import warscroll_ability_keywords from "../Data/WarscrollAbilityKeywords";
import Ability, { EnrichedAbility } from "../Types/DataTypes/Ability";

export const useWarscrollAbilities = () => {
    const memo = useMemo(()=>warscroll_abilities.map(o=>enrich(o)),[])
    return memo;
}

const enrich = (warscrollAbility : Ability) : EnrichedAbility => {
    const keywords = warscroll_ability_keywords.filter(o=>o.warscrollAbilityId === warscrollAbility.id).map(o=>o.keywordId);
    return {...warscrollAbility, keywords}
}

export default useWarscrollAbilities;