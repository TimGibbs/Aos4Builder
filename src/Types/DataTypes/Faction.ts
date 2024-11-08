export interface Faction {
    id:                                             string;
    name:                                           string;
    lore:                                           string;
    armyOfRenown:                                   boolean;
    hideMarksOfChaosSelector:                       boolean;
    excludedFactionSelection:                       boolean;
    rosterFactionKeywordRequiredGeneralWarscrollId: null | string;
    parentFactionKeywordId:                         null | string;
}
export default Faction;