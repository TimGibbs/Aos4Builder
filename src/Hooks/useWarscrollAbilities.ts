import { useMemo } from "react";
import warscroll_abilities from "../Data/WarscrollAbilities";
import Ability, { EnrichedAbility } from "../Types/DataTypes/Ability";
import WarscrollAbilityKeyword from "../Types/DataTypes/WarscrollAbilityKeyword";
import warscroll_ability_keywords from "../Data/WarscrollAbilityKeywords";

export const useWarscrollAbilities = () => {
    const memo = useMemo(()=>warscroll_abilities.map(o=>enrichWarscrollAbility(o, warscroll_ability_keywords)),[])
    return memo;
}

const enrichWarscrollAbility = (warscrollAbility : Ability, warscroll_ability_keywords: WarscrollAbilityKeyword[]) : EnrichedAbility => {
    const keywords = warscroll_ability_keywords.filter(o=>o.warscrollAbilityId === warscrollAbility.id).map(o=>o.keywordId);
    return {...warscrollAbility, keywords}
}

export default useWarscrollAbilities;