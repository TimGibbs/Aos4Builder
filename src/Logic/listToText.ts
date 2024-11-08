import abilities from "../Data/Abilities";
import factions from "../Data/Factions";
import formations from "../Data/Formations";
import lores from "../Data/Lores";
import warscrolls from "../Data/Warscrolls";
import List from "../Types/ListTypes/List";
import Unit from "../Types/ListTypes/Unit";
import { unitsCost } from "./pointSums";

function listToText(list: List): string {
    const lines: string[] = [];
    let totalPoints = 0; // Initialize total points

    // Top-level information
    if (list.factionId) lines.push(`<em><strong>${ factions.find(o=>o.id===list.factionId)?.name}</strong></em>`);
    if (list.formationId) {
        lines.push(`<em><strong>${formations.find(o=>o.id===list.formationId)?.name}</strong></em>`);
        lines.push(`<em><strong>Total Points: ${totalPoints}</strong></em>`); // Placeholder for total points
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
            totalPoints += unitsCost(regiment.leader, warscrolls);
        } else if (regiment.leader) {
            const leaderUnit = formatUnit(regiment.leader);
            lines.push(leaderUnit);
            totalPoints += unitsCost(regiment.leader, warscrolls);
        }

        // Regiment items and units
        regiment.regimentItems.forEach(item => {
            item.units.forEach(unit => {
                const unitString = formatUnit(unit);
                lines.push(unitString);
                totalPoints += unitsCost(unit, warscrolls); 
            });
        });
    });

    // Auxiliaries
    if (list.auxiliaries.length > 0) {
        lines.push("\n<em><strong>Auxiliaries</strong></em>");
        list.auxiliaries.forEach(auxiliary => {
            const auxiliaryString = formatUnit(auxiliary);
            lines.push(auxiliaryString);
            totalPoints += unitsCost(auxiliary, warscrolls);
        });
    }

    // Faction Terrain
    if (list.terrain) {
        lines.push("\n<em><strong>Faction Terrain</strong></em>");
        lines.push(`<em><strong>${warscrolls.find(o=>o.id===list.terrain?.warscrollId)?.name}</strong></em>`); // Wrap terrain name with <em> and <strong>
    }

    // Update the total points line with the actual total
    lines[2] = `<em><strong>Total Points: ${totalPoints}</strong></em>`; // Update total points after the formation name

    return lines.join("\n"); // Return with newline characters retained
}

// Helper function to format a unit, now with reinforced points
function formatUnit(unit: Unit, isGeneral: boolean = false): string {
    const warscroll = warscrolls.find(w => w.id === unit.warscrollId);
    let points = warscroll?.points ?? 0;

    // Double points if unit is reinforced
    if (unit.reinforced) {
        points *= 2;
    }

    const parts: string[] = [];
    parts.push(`<em><strong>${warscroll?.name}</strong></em> (${points} Points)`);

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
        parts.push(`• ${abilities.find(o=>o.id===unit.artifactId)?.name}}`);
    }
    return parts.join("\n"); // Return unit details with newline characters
}


export default listToText;