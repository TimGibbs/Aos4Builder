
import { abilities, factions, formations, lores, warscrolls } from "../Data/AllData";
import List from "../Types/ListTypes/List";
import Unit from "../Types/ListTypes/Unit";
import { listSum, unitsCost } from "./pointSums";

function listToText(list: List): string {
    const lines: string[] = [];

    const filteredWarscrolls = warscrolls.filter(o=>!o.isSpearhead)

    // Top-level information
    if (list.factionId) lines.push(`<em><strong>${ factions.find(o=>o.id===list.factionId)?.name}</strong></em>`);
    if (list.formationId) {
        lines.push(`<em><strong>${formations.find(o=>o.id===list.formationId)?.name}</strong></em>`);
        lines.push(`<em><strong>Total Points: ${listSum(list,filteredWarscrolls)}</strong></em>`); // Placeholder for total points
    }
    
    // Drops
    const drops = list.regiments.length + list.auxiliaries.length;
    lines.push(`<em><strong>Drops: ${drops}</strong></em>`);

    // Lore Information
    if (list.spellLoreId) lines.push(`<em><strong>Spell Lore – ${lores.find(o=>o.id===list.spellLoreId)?.name}</strong></em>`);
    if (list.prayerLoreId) lines.push(`<em><strong>Prayer Lore – ${lores.find(o=>o.id===list.prayerLoreId)?.name}</strong></em>`);
    if (list.manifestationLoreId) lines.push(`<em><strong>Manifestation Lore – ${lores.find(o=>o.id===list.manifestationLoreId)?.name}</strong></em>`);

    // Regiments
    list.regiments.forEach((regiment, i) => {
        const regimentName = regiment.isGeneral ? "General’s Regiment" : `Regiment ${i}`;
        lines.push(`\n<strong>${regimentName}</strong>`); // Regiment names in <strong>

        // Mark leader as general if this is the first regiment and `isGeneral` is true
        if (i === 0 && regiment.isGeneral && regiment.leader) {
            const leaderUnit = formatUnit(regiment.leader, true);
            lines.push(leaderUnit);
        } else if (regiment.leader) {
            const leaderUnit = formatUnit(regiment.leader);
            lines.push(leaderUnit);
        }

        // Regiment items and units
        regiment.regimentItems.forEach(item => {
            item.units.forEach(unit => {
                const unitString = formatUnit(unit);
                lines.push(unitString);
            });
        });
    });

    // Auxiliaries
    if (list.auxiliaries.length > 0) {
        lines.push("\n<em><strong>Auxiliaries</strong></em>");
        list.auxiliaries.forEach(auxiliary => {
            const auxiliaryString = formatUnit(auxiliary);
            lines.push(auxiliaryString);
        });
    }

    // Faction Terrain
    if (list.terrain) {
        lines.push("\n<em><strong>Faction Terrain</strong></em>");
        lines.push(`<em><strong>${filteredWarscrolls.find(o=>o.id===list.terrain?.warscrollId)?.name}</strong></em>`); // Wrap terrain name with <em> and <strong>
    }

    return lines.join("\n"); // Return with newline characters retained
}

// Helper function to format a unit, now with reinforced points
function formatUnit(unit: Unit, isGeneral: boolean = false): string {
    const filteredWarscrolls =  warscrolls.filter(o=>!o.isSpearhead)
    const warscroll = filteredWarscrolls.find(w => w.id === unit.warscrollId);

    const parts: string[] = [];
    parts.push(`<em><strong>${warscroll?.name}</strong></em> (${unitsCost(unit,filteredWarscrolls)} Points)`);

    if (unit.reinforced) {
        parts.push("• Reinforced");
    }
    if (isGeneral) {
        parts.push("• General");
    }
    if (unit.heroicTraitId) {
        parts.push(`• ${abilities.find(o=>o.id===unit.heroicTraitId)?.name}`);
    }
    if (unit.artifactId) {
        parts.push(`• ${abilities.find(o=>o.id===unit.artifactId)?.name}`);
    }
    if(unit.otherEnhancements){
        Object.entries(unit.otherEnhancements).forEach(([abilityGroupId, abilityId]: [string, string| null]) =>{
            if(abilityId){
                parts.push(`• ${abilities.find(o=>o.id===abilityId)?.name}`);
            }
        })
    }
    return parts.join("\n"); // Return unit details with newline characters
}


export default listToText;