import { useMemo } from "react";
import formation_abilities from "../Data/FormationAbilities";
import formation_ability_keywords from "../Data/FormationAbilityKeywords";
import Ability, { EnrichedAbility } from "../Types/DataTypes/Ability";

export const useFormationAbilities = () => {
    const memo = useMemo(() => formation_abilities.map(o => enrich(o)), [])
    return memo;
}

const enrich = (formationAbility: Ability): EnrichedAbility => {
    const keywords = formation_ability_keywords.filter(o => o.battleFormationRuleId === formationAbility.id).map(o => o.keywordId);
    return { ...formationAbility, keywords }
}

export default useFormationAbilities;