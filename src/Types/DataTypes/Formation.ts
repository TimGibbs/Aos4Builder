import { EnrichedAbility } from "./Ability";

export interface Formation {
    id:                   string;
    name:                 string;
    factionTerrainLimit: number;
    factionId:            string;
    publicationId:        string;
}

export interface EnrichedFormation extends Formation {
    abilities?: EnrichedAbility[]
    abilityIds : string[]
}

export default Formation;