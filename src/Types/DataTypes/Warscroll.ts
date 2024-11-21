import Save from "./Save";

export interface Warscroll {
    id:                             string;
    name:                           string;
    subname:                        null;
    lore:                           string;
    modelCount:                     number;
    baseSize:                       null | string;
    points:                         number | null;
    notes:                          null | string;
    isSpearhead:                    boolean;
    cannotBeReinforced:             boolean;
    referenceKeywords:              string;
    move:                           string;
    save:                           Save;
    control:                        string;
    health:                         string;
    wargearOptionsText:             null | string;
    publicationId:                  string;
    limitingWarscrollId:            null | string;
    requiredPrimaryHeroWarscrollId: null | string;
    isLegends:                      boolean;
}

export interface EnrichedWarscroll extends Warscroll {
    keywords : string[]
    regimentOptionIds : string[]
    abilityIds : string[]
    weaponIds : string[]
    isUnique : boolean
    isHero : boolean
    isTerrain : boolean
    isManifestation : boolean
} 

export default Warscroll;