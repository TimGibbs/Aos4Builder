import { useMemo } from "react";
import warscroll_keywords from "../Data/WarscrollKeywords";
import warscrolls from "../Data/Warscrolls";
import Warscroll from "../Types/DataTypes/Warscroll";
import useWarscrollAbilities from "./useWarscrollAbilities";
import { EnrichedAbility } from "../Types/DataTypes/Ability";
import useKeywords from "./useKeywords";
import useWarscrollRegimentOptions, { EnrichedWarscrollRegimentOptions } from "./useWarscrollRegimentOptions";
import WarscrollWeapon, { EnrichedWarscrollWeapon } from "../Types/DataTypes/WarscrollWeapon";
import useWarscrollWeapons from "./useWarscrollWeapons";

export interface EnrichedWarscroll extends Warscroll {
    keywords : string[]
    regimentOptions : EnrichedWarscrollRegimentOptions[]
    abilities : EnrichedAbility[]
    weapons : WarscrollWeapon[]
    isUnique : boolean
    isHero : boolean
    isTerrain : boolean
    isManifestation : boolean
} 

export const useWarscrolls = () => {
    const abilities = useWarscrollAbilities();
    const regimentOptions = useWarscrollRegimentOptions();
    const warscrollWeapons = useWarscrollWeapons();
    const { common }  = useKeywords();
    const memo = useMemo(()=>warscrolls.filter(o=>!o.isSpearhead).map(o=>enrich(o, abilities, regimentOptions, warscrollWeapons, common.unique, common.hero, common.terrain, common.manifestation)),
    [abilities, regimentOptions, warscrollWeapons, common])
    return memo;
}

const enrich = (warscroll : Warscroll, abilitiesArray : EnrichedAbility[], options: EnrichedWarscrollRegimentOptions[], weaponsArray:EnrichedWarscrollWeapon[],  uniqueKey : string, heroKey : string, terrainKey : string, manifestationKey : string) : EnrichedWarscroll => {

    const unitKeywords = warscroll_keywords.filter(o=>o.warscrollId === warscroll.id).map(o=>o.keywordId);
    const regimentOptions = options.filter(o=>o.warscrollId === warscroll.id);
    const abilities = abilitiesArray.filter(o=>o.warscrollId && o.warscrollId === warscroll.id);
    const weapons = weaponsArray.filter(o=>o.warscrollId === warscroll.id).sort((a,b)=> b.type.localeCompare(a.type));
    const isUnique = unitKeywords.includes(uniqueKey);
    const isHero = unitKeywords.includes(heroKey);
    const isTerrain = unitKeywords.includes(terrainKey);
    const isManifestation = unitKeywords.includes(manifestationKey);
    return {...warscroll, keywords: unitKeywords, regimentOptions, abilities, weapons, isUnique, isHero, isTerrain, isManifestation }

}

export default useWarscrolls;