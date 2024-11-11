import Roll from "./Roll";

export interface WarscrollWeapon {
    id:            string;
    name:          string;
    type:          WarscrollWeaponType;
    range:         null | string;
    attacks:       string;
    hit:           Roll;
    wound:         Roll;
    rend:          string;
    damage:        string;
    battleDamaged: boolean;
    warscrollId:   string;
}

export interface EnrichedWarscrollWeapon extends WarscrollWeapon {
    weaponAbilities : string[]
  } 

export type WarscrollWeaponType = "melee" | "ranged";

export default WarscrollWeapon;


