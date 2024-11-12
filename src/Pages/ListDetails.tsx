import { Container, Form } from "react-bootstrap";
import useFactions from "../Hooks/useFactions";
import useLores from "../Hooks/useLores";
import useWarscrolls from "../Hooks/useWarscrolls";
import List from "../Types/ListTypes/List";
import { WarscrollViewer } from "../Components/WarscrollViewer/WarscrollViewer";
import { useParams } from "react-router-dom";
import useSavedLists from "../Hooks/useSavedLists";
import AbilityGroupViewer from "../Components/AbilityGroupViewer";
import { useState } from "react";
import warscrollSort from "../Logic/warscrollSortingLogic";
import useAbilityGroups, { EnrichedAbilityGroup } from "../Hooks/useAbilityGroups";
import notNull from "../Logic/notNull";

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
    const {dictionary} = useWarscrolls();
    const lores = useLores();
    const {common} = useAbilityGroups();
    const [showBasic, setShowBasic] = useState<boolean>(false)
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
    const uniqueWarscrollIds = new Set<string>(warscrollids);
    const filteredWarscrolls = [...uniqueWarscrollIds].map(o=>dictionary[o]).sort(warscrollSort);

    const battleTraits = faction?.abilityGroups.find(o => o.abilityGroupType === "battleTraits")

    const enhancementIds : string[] = units.flatMap((o)=>[o.artifactId, o.heroicTraitId, ...(o.otherEnhancements ? Object.values(o.otherEnhancements):[])].filter(notNull))

    const enhancements : EnrichedAbilityGroup[] = faction?.abilityGroups?.map(o=>{
        const abilities = o.abilities.filter(p => enhancementIds.includes(p.id))
        return {...o, abilities}
    }).filter(o=>o.abilities.length >0) ?? []

    return <Container>
        <Form.Check style={{ textAlign: "left" }}
            type="switch"
            id="basic-ability-switch"
            label="Include basic abilities"
            checked={showBasic}
            onChange={()=>setShowBasic(s=>!s)}
        />
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
        {enhancements.length >0 && <>
            <h2>Enhancements</h2>
            {enhancements.map(o=> <AbilityGroupViewer key={o.id} abilityGroup={o} />)}
        </>}
        {showBasic && <>
            <h2>Basic</h2>
            {common.map(o=> <AbilityGroupViewer key={o.id} abilityGroup={o} />)}
        </>}
    </Container>
}

export default ListDisplay;