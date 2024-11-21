import { Container, Form } from "react-bootstrap";
import List from "../Types/ListTypes/List";
import { WarscrollViewer } from "../Components/WarscrollViewer/WarscrollViewer";
import { useParams } from "react-router-dom";
import useSavedLists from "../Hooks/useSavedLists";
import AbilityGroupViewer from "../Components/AbilityGroupViewer";
import { useState } from "react";
import warscrollSort from "../Logic/warscrollSortingLogic";
import notNull from "../Logic/notNull";
import { EnrichedAbilityGroup } from "../Types/DataTypes/AbilityGroup";
import { useData } from "../Hooks/useData";

const ListDisplay: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { readList } = useSavedLists();

    if (!id) return <div>Unrecognised Id</div>
    const list = readList(id)
    if (!list) return <div>List not found</div>

    return <WarscrollAndAbilitiesDisplay list={list} />
}

const WarscrollAndAbilitiesDisplay: React.FC<{ list: List }> = ({ list }) => {
    const data = useData();
    const [showBasic, setShowBasic] = useState<boolean>(false)
    const faction = list.factionId ? data.factions[list.factionId] : null;
    const formation = faction?.formations?.find(o => o.id === list.formationId);
    const spells = list.spellLoreId ? data.lores[list.spellLoreId] : null;
    const prayers = list.prayerLoreId ? data.lores[list.prayerLoreId] : null;
    const manifestations = list.manifestationLoreId ? data.lores[list.manifestationLoreId] : null;
    const units = [...list.regiments.flatMap(o => [o.leader, ...o.regimentItems.flatMap(p => p.units)]), ...list.auxiliaries]

    if (list.terrain) {
        units.push(list.terrain)
    }

    const warscrollids: string[] = units.filter(o => o.warscrollId !== null).map(o => o.warscrollId ?? "")
    const warscrollIdSet = [...new Set<string>(warscrollids)]

    const filteredWarscrolls = warscrollIdSet.map(o=>data.warscrolls[o]).sort(warscrollSort);

    const battleTraits = faction?.abilityGroups?.find(o => o.abilityGroupType === "battleTraits")

    const enhancementIds : string[] = units.flatMap((o)=>[o.artifactId, o.heroicTraitId, ...(o.otherEnhancements ? Object.values(o.otherEnhancements):[])].filter(notNull))

    const enhancements : EnrichedAbilityGroup[] = faction?.abilityGroups?.map(o=>{
        const abilities = o.abilities?.filter(p => enhancementIds.includes(p.id)) ?? []
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
        {filteredWarscrolls.map(o => <WarscrollViewer key={o.id} warscrollId={o.id} includeAbilites={true} />)}
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
            {data.commonAbilityGroups.map(o=> <AbilityGroupViewer key={o.id} abilityGroup={o} />)}
        </>}
    </Container>
}

export default ListDisplay;