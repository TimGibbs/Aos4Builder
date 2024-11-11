import { useMemo } from "react";
import warscroll_weapons from "../Data/WarscrollWeapons";
import WarscrollWeapon, { EnrichedWarscrollWeapon } from "../Types/DataTypes/WarscrollWeapon";
import warscroll_weapon_weapon_abilities from "../Data/WarscrollWeaponWeaponAbilities";

export const useWarscrollWeapons = () => {

    const memo = useMemo(()=>warscroll_weapons.map(o=>enrich(o)),[])
    return memo;
}

const enrich = (warscrollWeapon : WarscrollWeapon) : EnrichedWarscrollWeapon => {
    const weaponAbilities = warscroll_weapon_weapon_abilities.filter(o=>o.warscrollWeaponId === warscrollWeapon.id).map(o=>o.weaponAbilityId);
    return {...warscrollWeapon,  weaponAbilities}
}

export default useWarscrollWeapons;