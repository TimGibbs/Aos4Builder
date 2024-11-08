import { useMemo } from "react";
import factions from "../Data/Factions";
import Faction from "../Types/DataTypes/Faction";
import WarscrollFactionKeyword from "../Types/DataTypes/WarcrollFactionKeyword";
import useFormations, { EnrichedFormation } from "./useFormations";
import warscroll_faction_keywords from "../Data/WarscrollFactionKeywords";
import useLores, { EnrichedLore } from "./useLores";
import useAbilityGroups, { EnrichedAbilityGroup } from "./useAbilityGroups";

export interface EnrichedFaction extends Faction {
    formations : EnrichedFormation[]
    warscrolls : WarscrollFactionKeyword[]
    lores : EnrichedLore[]
    abilityGroups : EnrichedAbilityGroup[]
} 

export const useFactions = () => {
    const formations = useFormations();
    const lores = useLores();
    const abilityGroups = useAbilityGroups();
    const memo = useMemo(()=>factions.map(o=>enrich(o, formations, lores, abilityGroups)),[formations, lores, abilityGroups])
    return memo;
}

const enrich = (faction : Faction, formationsArray : EnrichedFormation[], loresArray: EnrichedLore[], abilityGroupsArray : EnrichedAbilityGroup[]) : EnrichedFaction => {
    const formations = formationsArray.filter(o=>o.factionId && o.factionId === faction.id);
    const warscrolls = warscroll_faction_keywords.filter(o=>o.factionKeywordId=== faction.id)
    const lores = loresArray.filter(o=>o.factionId && o.factionId === faction.id);
    const abilityGroups = abilityGroupsArray.filter(o=>o.factionId === faction.id);
    return {...faction, formations, warscrolls, lores, abilityGroups }
}

export default useFactions;