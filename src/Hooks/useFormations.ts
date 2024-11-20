import { useMemo } from "react";
import formations from "../Data/Formations";
import { EnrichedAbility } from "../Types/DataTypes/Ability";
import Formation, { EnrichedFormation } from "../Types/DataTypes/Formation";
import useFormationAbilities from "./useFormationAbilities";



export const useFormations = () => {
    const formationAbilities = useFormationAbilities()
    const memo = useMemo(() => formations.map(o => enrich(o, formationAbilities)), [formationAbilities])
    return memo;
}

const enrich = (formation: Formation, formationAbilities: EnrichedAbility[]): EnrichedFormation => {
    const abilities = formationAbilities.filter(o => o.battleFormationId && o.battleFormationId === formation.id);
    return { ...formation, abilities, abilityIds: abilities.map(o=>o.id) }
}

export default useFormations;