import { useMemo } from "react";
import { ability_groups } from "../Data/AbilityGroups";
import { EnrichedAbility } from "../Types/DataTypes/Ability";
import AbilityGroup from "../Types/DataTypes/AbilityGroup";
import useAbilities from "./useAbilities";

export interface EnrichedAbilityGroup extends AbilityGroup {
    abilities : EnrichedAbility[]
} 

export const useAbilityGroups = () => {
    const abilities = useAbilities()
    const memo = useMemo(()=>ability_groups.map(o=>enrich(o, abilities)),[abilities])
    return memo;
}

const enrich = (abilityGroup : AbilityGroup, abilitiesArray: EnrichedAbility[]) : EnrichedAbilityGroup => {
    const abilities = abilitiesArray.filter(o=>o.abilityGroupId && o.abilityGroupId === abilityGroup.id);
    return {...abilityGroup, abilities}
}

export default useAbilityGroups;