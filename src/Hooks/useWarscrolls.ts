import { useMemo } from "react";
import warscroll_keywords from "../Data/WarscrollKeywords";
import warscrolls from "../Data/Warscrolls";
import Warscroll from "../Types/DataTypes/Warscroll";
import useWarscrollAbilities from "./useWarscrollAbilities";
import { EnrichedAbility } from "../Types/DataTypes/Ability";
import useKeywords from "./useKeywords";
import useWarscrollRegimentOptions, { EnrichedWarscrollRegimentOptions } from "./useWarscrollRegimentOptions";

export interface EnrichedWarscroll extends Warscroll {
    keywords : string[]
    regimentOptions : EnrichedWarscrollRegimentOptions[]
    abilities : EnrichedAbility[]
    isUnique : boolean
    isHero : boolean
    isTerrain : boolean
    isManifestation : boolean
} 

export const useWarscrolls = () => {
    const abilities = useWarscrollAbilities();
    const regimentOptions = useWarscrollRegimentOptions();
    const { common }  = useKeywords();
    const memo = useMemo(()=>warscrolls.filter(o=>!o.isSpearhead).map(o=>enrich(o, abilities, regimentOptions, common.unique, common.hero, common.terrain, common.manifestation)),
    [abilities, regimentOptions, common])
    return memo;
}

const enrich = (warscroll : Warscroll, abilitiesArray : EnrichedAbility[], options : EnrichedWarscrollRegimentOptions[],  uniqueKey : string, heroKey : string, terrainKey : string, manifestationKey : string) : EnrichedWarscroll => {

    const unitKeywords = warscroll_keywords.filter(o=>o.warscrollId === warscroll.id).map(o=>o.keywordId);
    const regimentOptions = options.filter(o=>o.warscrollId === warscroll.id);
    const abilities = abilitiesArray.filter(o=>o.warscrollId && o.warscrollId === warscroll.id);
    const isUnique = unitKeywords.includes(uniqueKey);
    const isHero = unitKeywords.includes(heroKey);
    const isTerrain = unitKeywords.includes(terrainKey);
    const isManifestation = unitKeywords.includes(manifestationKey);
    return {...warscroll, keywords: unitKeywords, regimentOptions, abilities, isUnique, isHero, isTerrain, isManifestation }

}

export default useWarscrolls;