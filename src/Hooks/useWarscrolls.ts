import { useMemo } from "react";
import warscroll_keywords from "../Data/WarscrollKeywords";
import warscrolls from "../Data/Warscrolls";
import Warscroll, { EnrichedWarscroll } from "../Types/DataTypes/Warscroll";
import Ability from "../Types/DataTypes/Ability";
import useKeywords from "./useKeywords";
import WarscrollWeapon from "../Types/DataTypes/WarscrollWeapon";
import warscroll_weapons from "../Data/WarscrollWeapons";
import WarscrollRegimentOptions from "../Types/DataTypes/WarscrollRegimentOptions";
import warscroll_regiment_options from "../Data/WarscrollRegimentOptions";
import warscroll_abilities from "../Data/WarscrollAbilities";

export const useWarscrolls = () => {
    const { common }  = useKeywords();
    const memo = useMemo(()=>warscrolls.filter(o=>!o.isSpearhead).map(o=>enrich(o, warscroll_abilities, warscroll_regiment_options, warscroll_weapons, common.unique, common.hero, common.terrain, common.manifestation)),
    [common])
    return memo;
}

const enrich = (warscroll : Warscroll, abilitiesArray : Ability[], options: WarscrollRegimentOptions[], weaponsArray:WarscrollWeapon[],  uniqueKey : string, heroKey : string, terrainKey : string, manifestationKey : string) : EnrichedWarscroll => {

    const unitKeywords = warscroll_keywords.filter(o=>o.warscrollId === warscroll.id).map(o=>o.keywordId);
    const regimentOptionIds = options.filter(o=>o.warscrollId === warscroll.id).map(o=>o.id);
    const abilityIds = abilitiesArray.filter(o=>o.warscrollId && o.warscrollId === warscroll.id).map(o=>o.id);
    const weaponIds = weaponsArray.filter(o=>o.warscrollId === warscroll.id).sort((a,b)=> b.type.localeCompare(a.type)).map(o=>o.id);
    const isUnique = unitKeywords.includes(uniqueKey);
    const isHero = unitKeywords.includes(heroKey);
    const isTerrain = unitKeywords.includes(terrainKey);
    const isManifestation = unitKeywords.includes(manifestationKey);
    return {...warscroll, keywords: unitKeywords, regimentOptionIds, abilityIds, weaponIds, isUnique, isHero, isTerrain, isManifestation }

}

export default useWarscrolls;