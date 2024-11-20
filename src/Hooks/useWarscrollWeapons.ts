import { useMemo } from "react";
import warscroll_weapons from "../Data/WarscrollWeapons";
import WarscrollWeapon, { EnrichedWarscrollWeapon } from "../Types/DataTypes/WarscrollWeapon";
import warscroll_weapon_weapon_abilities from "../Data/WarscrollWeaponWeaponAbilities";
import WarscrollWeaponWeaponAbility from "../Types/DataTypes/WarscrollWeaponWeaponAbility";

export const useWarscrollWeapons = () => {

    const memo = useMemo(()=>warscroll_weapons.map(o=>enrichWarscrollWeapon(o, warscroll_weapon_weapon_abilities)),[])
    return memo;
}

const enrichWarscrollWeapon = (warscrollWeapon : WarscrollWeapon, warscroll_weapon_weapon_abilities:WarscrollWeaponWeaponAbility[]) : EnrichedWarscrollWeapon => {
    const weaponAbilities = warscroll_weapon_weapon_abilities.filter(o=>o.warscrollWeaponId === warscrollWeapon.id).map(o=>o.weaponAbilityId);
    return {...warscrollWeapon,  weaponAbilities}
}

export default useWarscrollWeapons;