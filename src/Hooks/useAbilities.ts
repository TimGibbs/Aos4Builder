import { useMemo } from "react";
import Ability, { EnrichedAbility } from "../Types/DataTypes/Ability";
import abilities from "../Data/Abilities";
import ability_keywords from "../Data/AbilityKeywords";

export const useAbilities = () => {
    const memo = useMemo(() => abilities.map(o => enrich(o)), [])
    return memo;
}

const enrich = (ability: Ability): EnrichedAbility => {
    const keywords = ability_keywords.filter(o => o.abilityId === ability.id).map(o => o.keywordId);
    return { ...ability, keywords }
}

export default useAbilities;