import { Container } from "react-bootstrap";
import useFactions from "../Hooks/useFactions";
import useLores from "../Hooks/useLores";
import useWarscrolls from "../Hooks/useWarscrolls";
import List from "../Types/ListTypes/List";
import { WarscrollViewer } from "../Components/WarscrollViewer/WarscrollViewer";
import AbilityViewer, { AbilityViewerParams } from "../Components/AbilityViewer/AbilityViewer";
import { useParams } from "react-router-dom";
import useSavedLists from "../Hooks/useSavedLists";
import AbilityGroupViewer from "../Components/AbilityGroupViewer";

const ListDisplay: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { readList } = useSavedLists();

    if (!id) return <div>Unrecognised Id</div>
    const list = readList(id)
    if (!list) return <div>List not found</div>

    return <WarscrollAndAbilitiesDisplay list={list} />
}

const WarscrollAndAbilitiesDisplay: React.FC<{ list: List }> = ({ list }) => {
    const factions = useFactions();
    const warscrolls = useWarscrolls();
    const lores = useLores();
    const faction = factions.find(o => o.id === list.factionId)
    const formation = faction?.formations.find(o => o.id === list.formationId);
    const spells = lores.find(o => o.id === list.spellLoreId);
    const prayers = lores.find(o => o.id === list.prayerLoreId);
    const manifestations = lores.find(o => o.id === list.manifestationLoreId);
    const units = [...list.regiments.flatMap(o => [o.leader, ...o.regimentItems.flatMap(p => p.units)]), ...list.auxiliaries]

    if (list.terrain) {
        units.push(list.terrain)
    }

    const warscrollids: string[] = units.filter(o => o.warscrollId !== null).map(o => o.warscrollId ?? "")
    const warscrollIdSet = new Set<string>(warscrollids)

    const filteredWarscrolls = warscrolls.filter(o => warscrollIdSet.has(o.id)).sort((a, b) => {
        if (a.isHero && !b.isHero) {
            return -1;
        }
        if (b.isHero && !a.isHero) {
            return 1;
        }
        if (a.isManifestation && !b.isManifestation) {
            return 1;
        }
        if (b.isManifestation && !a.isManifestation) {
            return -1;
        }
        if (a.isTerrain && !b.isTerrain) {
            return 1;
        }
        if (b.isTerrain && !a.isTerrain) {
            return -1;
        }
        return a.name.localeCompare(b.name);
    });

    const battleTraits = faction?.abilityGroups.find(o => o.abilityGroupType === "battleTraits")

    const artifact: string[] = units.filter(o => o.artifactId !== null).map(o => o.artifactId ?? "");
    const heroicTrait: string[] = units.filter(o => o.heroicTraitId).map(o => o.heroicTraitId ?? "");
    const others: string[] = units.filter(o => o.otherEnhancements).flatMap(o => Object.values(o.otherEnhancements).map(p => p ?? ""));

    const artifacts: AbilityViewerParams[] = faction?.abilityGroups.filter(o => o.abilityGroupType === "artefactsOfPower")?.flatMap(o => o.abilities.filter(p => artifact.includes(p.id)).map(p => ({ ability: p, abilityGroup: o }))) ?? [];
    const heroicTraits: AbilityViewerParams[] = faction?.abilityGroups.filter(o => o.abilityGroupType === "heroicTraits")?.flatMap(o => o.abilities.filter(p => heroicTrait.includes(p.id)).map(p => ({ ability: p, abilityGroup: o }))) ?? [];
    const otherEnhancements: AbilityViewerParams[] = faction?.abilityGroups.filter(o => o.abilityGroupType === "otherEnhancements")?.flatMap(o => o.abilities.filter(p => others.includes(p.id)).map(p => ({ ability: p, abilityGroup: o }))) ?? [];

    const abilities = [...artifacts, ...heroicTraits, ...otherEnhancements];

    return <Container>
        <h2>Units</h2>
        {filteredWarscrolls.map(o => <WarscrollViewer key={o.id} warscroll={o} includeAbilites={true} />)}
        {(spells || prayers || manifestations) && <>
            <h2>Lores</h2>
            {spells && <AbilityGroupViewer abilityGroup={spells} />}
            {prayers && <AbilityGroupViewer abilityGroup={prayers} />}
            {manifestations && <AbilityGroupViewer abilityGroup={manifestations} />}
        </>}
        {battleTraits && <>
            <h2>Faction</h2>
            <AbilityGroupViewer abilityGroup={battleTraits} />
        </>}
        {formation && <>
            <h2>Formation</h2>
            <AbilityGroupViewer abilityGroup={formation} />
        </>}
        <h2>Enhancements</h2>
        {abilities.map(o => <AbilityViewer key={o.ability.id} ability={o.ability} abilityGroup={o.abilityGroup} warscroll={o.warscroll} formation={o.formation} lore={o.lore} />)}

    </Container>
}

export default ListDisplay;