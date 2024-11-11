import { useMemo } from "react";
import { ability_groups } from "../Data/AbilityGroups";
import { EnrichedAbility } from "../Types/DataTypes/Ability";
import AbilityGroup from "../Types/DataTypes/AbilityGroup";
import useAbilities from "./useAbilities";
import AbilityGroupRequiredWarscroll from "../Types/DataTypes/AbilityGroupRequiredWarscroll";
import ability_group_required_warscrolls from "../Data/AbilityGroupRequiredWarscroll";

export interface EnrichedAbilityGroup extends AbilityGroup {
    abilities : EnrichedAbility[]
    warscrollIds : string[]
} 

export const useAbilityGroups = () => {
    const abilities = useAbilities()
    const memo = useMemo(()=>ability_groups.map(o=>enrich(o, abilities, ability_group_required_warscrolls)),[abilities])
    return memo;
}

const enrich = (abilityGroup : AbilityGroup, abilitiesArray: EnrichedAbility[], abilityGroupRequiredWarscrolls: AbilityGroupRequiredWarscroll[]) : EnrichedAbilityGroup => {
    const abilities = abilitiesArray.filter(o=>o.abilityGroupId && o.abilityGroupId === abilityGroup.id);
    const warscrollIds = abilityGroupRequiredWarscrolls.filter(o=>o.abilityGroupId===abilityGroup.id).map(o=>o.warscrollId);
    return {...abilityGroup, abilities, warscrollIds}
}

export default useAbilityGroups;