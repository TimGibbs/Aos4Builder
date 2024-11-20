import { EnrichedAbility } from "./Ability";

export interface Lore {
    id:                   string;
    name:                 string;
    factionId:            string | null;
    publicationId:        string;
}

export interface EnrichedLore extends Lore {
    abilities? : EnrichedAbility[]
    abilityIds : string[]
    loreType : LoreType
} 

export type LoreType = "prayer" | "spell" | "summon" | null

export default Lore;