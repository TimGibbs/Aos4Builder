import { useMemo } from "react";
import formations from "../Data/Formations";
import { EnrichedAbility } from "../Types/DataTypes/Ability";
import Formation from "../Types/DataTypes/Formation";
import useFormationAbilities from "./useFormationAbilities";

export interface EnrichedFormation extends Formation {
    abilities : EnrichedAbility[]
} 

export const useFormations = () => {
    const formationAbilities = useFormationAbilities()
    const memo = useMemo(()=>formations.map(o=>enrich(o, formationAbilities)),[formationAbilities])
    return memo;
}

const enrich = (lore : Formation, formationAbilities: EnrichedAbility[]) : EnrichedFormation => {
    const abilities = formationAbilities.filter(o=>o.loreId && o.loreId === lore.id);
    return {...lore, abilities}
}

export default useFormations;