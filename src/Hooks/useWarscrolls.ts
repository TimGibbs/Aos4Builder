import { useMemo } from "react";
import warscroll_keywords from "../Data/WarscrollKeywords";
import Warscroll from "../Types/DataTypes/Warscroll";
import useWarscrollAbilities from "./useWarscrollAbilities";
import { EnrichedAbility } from "../Types/DataTypes/Ability";
import useKeywords from "./useKeywords";
import useWarscrollRegimentOptions, { EnrichedWarscrollRegimentOptions } from "./useWarscrollRegimentOptions";
import { EnrichedWarscrollWeapon } from "../Types/DataTypes/WarscrollWeapon";
import useWarscrollWeapons from "./useWarscrollWeapons";
import warscrolls from "../Data/Warscrolls";

export interface EnrichedWarscroll extends Warscroll {
    keywords : string[]
    regimentOptions : EnrichedWarscrollRegimentOptions[]
    abilities : EnrichedAbility[]
    weapons : EnrichedWarscrollWeapon[]
    isUnique : boolean
    isHero : boolean
    isTerrain : boolean
    isManifestation : boolean
} 

interface UseWarscrollReturn {
    warscrolls : EnrichedWarscroll[]
    spearhead : EnrichedWarscroll[]
    dictionary : Record<string, EnrichedWarscroll>
}

export const useWarscrolls = () : UseWarscrollReturn => {
    const abilities = useWarscrollAbilities();
    const regimentOptions = useWarscrollRegimentOptions();
    const warscrollWeapons = useWarscrollWeapons();
    const { common }  = useKeywords();
    const memo = useMemo(()=>{
        const returnWarscrolls : EnrichedWarscroll[] =[]
        const spearhead : EnrichedWarscroll[] = []
        const dictionary : Record<string, EnrichedWarscroll> = {}
        warscrolls.forEach(o=>{
            const x = enrich(o, abilities, regimentOptions, warscrollWeapons, common.unique, common.hero, common.terrain, common.manifestation)
            if(x.isSpearhead) spearhead.push(x);
            if(!x.isSpearhead) warscrolls.push(x);
            dictionary[x.id] = x
        })
        return { warscrolls : returnWarscrolls, spearhead, dictionary} 
    },
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