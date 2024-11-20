import { useMemo } from "react";
import { ability_groups } from "../Data/AbilityGroups";
import { EnrichedAbility } from "../Types/DataTypes/Ability";
import AbilityGroup, { EnrichedAbilityGroup } from "../Types/DataTypes/AbilityGroup";
import useAbilities from "./useAbilities";
import AbilityGroupRequiredWarscroll from "../Types/DataTypes/AbilityGroupRequiredWarscroll";
import ability_group_required_warscrolls from "../Data/AbilityGroupRequiredWarscroll";

interface UseAbilityGroupsReturn {

    abilityGroups: EnrichedAbilityGroup[]
    common: EnrichedAbilityGroup[]
    dictionary: Record<string, EnrichedAbilityGroup>
    factionDictionary: Record<string, EnrichedAbilityGroup[]>
}



export const useAbilityGroups = () : UseAbilityGroupsReturn => {
    const abilities = useAbilities()
    const memo = useMemo(() => {
        const common : EnrichedAbilityGroup[] = [];
        const dictionary : Record<string,EnrichedAbilityGroup> = {}
        const factionDictionary : Record<string,EnrichedAbilityGroup[]> = {}
        const abilityGroups : EnrichedAbilityGroup[] = [];
        ability_groups.forEach(o => {
            
            const g = enrich(o, abilities, ability_group_required_warscrolls)
            if(!g.abilityGroupType && g.factionId===null && g.name!=="Spearhead Core Abilities") common.push(g);
            if(g.factionId && g.factionId!==null) factionDictionary[g.factionId] = [...(factionDictionary[g.factionId] ??[]), g]
            abilityGroups.push(g);
            dictionary[g.id] = g;
        });
        return {abilityGroups, common, dictionary, factionDictionary};
    }, [abilities])
    return memo;
}

const enrich = (abilityGroup: AbilityGroup, abilitiesArray: EnrichedAbility[], abilityGroupRequiredWarscrolls: AbilityGroupRequiredWarscroll[]): EnrichedAbilityGroup => {
    const abilities = abilitiesArray.filter(o => o.abilityGroupId && o.abilityGroupId === abilityGroup.id);
    const warscrollIds = abilityGroupRequiredWarscrolls.filter(o => o.abilityGroupId === abilityGroup.id).map(o => o.warscrollId);
    return { ...abilityGroup, abilities, abilityIds:abilities.map(o=>o.id), warscrollIds }
}

export default useAbilityGroups;