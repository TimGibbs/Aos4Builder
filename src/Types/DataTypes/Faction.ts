import { EnrichedAbilityGroup } from "./AbilityGroup";
import { EnrichedFormation } from "./Formation";
import { EnrichedLore } from "./Lore";
import WarscrollFactionKeyword from "./WarcrollFactionKeyword";

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

export interface EnrichedFaction extends Faction {
    formationIds: string[]
    warscrollIds: string[]
    loreIds: string[]
    abilityGroupIds: string[]
}


export default Faction;