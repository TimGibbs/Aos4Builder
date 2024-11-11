import { useMemo } from "react";
import weapon_abilities from "../Data/WeaponAbilities";
import Rule from "../Types/DataTypes/Rule";


export const useWeaponAbilities = () => {

    const memo = useMemo(()=>{
        const dictionary : Record<string, Rule> = {};
        weapon_abilities.forEach(o=>dictionary[o.id] = o)
        return dictionary;
    },[])
    return memo;
}

export default useWeaponAbilities;