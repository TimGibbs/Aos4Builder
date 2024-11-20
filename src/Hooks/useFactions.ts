import { useMemo } from "react";
import factions from "../Data/Factions";
import Faction, { EnrichedFaction } from "../Types/DataTypes/Faction";
import useFormations from "./useFormations";
import warscroll_faction_keywords from "../Data/WarscrollFactionKeywords";
import useLores from "./useLores";
import useAbilityGroups from "./useAbilityGroups";
import { EnrichedLore } from "../Types/DataTypes/Lore";
import { EnrichedFormation } from "../Types/DataTypes/Formation";
import { EnrichedAbilityGroup } from "../Types/DataTypes/AbilityGroup";


export const useFactions = () => {
    const formations = useFormations();
    const lores = useLores();
    const {factionDictionary} = useAbilityGroups();
    const memo = useMemo(() => factions.map(o => enrich(o, formations, lores, factionDictionary[o.id]??[])).sort((a, b) => a.name.localeCompare(b.name)), [formations, lores, factionDictionary])
    return memo;
}

const enrich = (faction: Faction, formationsArray: EnrichedFormation[], loresArray: EnrichedLore[], abilityGroupsArray: EnrichedAbilityGroup[]): EnrichedFaction => {
    const formations = formationsArray.filter(o => o.factionId && o.factionId === faction.id);
    const warscrolls = warscroll_faction_keywords.filter(o => o.factionKeywordId === faction.id)
    const lores = loresArray.filter(o => o.factionId && o.factionId === faction.id);
    const abilityGroups = abilityGroupsArray.filter(o => o.factionId === faction.id);
    return { ...faction, formations, formationIds:formations.map(o=>o.id), warscrolls, warscrollIds: warscrolls.map(o=>o.warscrollId), lores, loreIds: lores.map(o=>o.id), abilityGroups, abilityGroupIds: abilityGroups.map(o=>o.id) }
}

export default useFactions;