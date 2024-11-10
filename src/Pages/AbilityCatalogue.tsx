import { Col, Container, Form, Row } from "react-bootstrap";
import AbilityViewer, { AbilityViewerParams } from "../Components/AbilityViewer";
import useAbilityGroups from "../Hooks/useAbilityGroups";
import useWarscrolls from "../Hooks/useWarscrolls";
import useFormations from "../Hooks/useFormations";
import useLores from "../Hooks/useLores";
import useFactions from "../Hooks/useFactions";
import { useState } from "react";
import WarscrollNameAutocomplete from "../Components/WarscrollNameAutocomplete";
import KeywordAutocomplete from "../Components/KeywordAutocomplete";
import useKeywords from "../Hooks/useKeywords";

const AbilityCatalogue: React.FC = () => {
    const [factionId, setFactionId] = useState<string | undefined>();
    const [warscrollId, setWarscrollId] = useState<string | undefined>();
    const [keywordId, setKeywordId] = useState<string | undefined>();

    const factions = useFactions();
    const abilityGroups = useAbilityGroups();
    const warscrolls = useWarscrolls();
    const formations = useFormations();
    const lores = useLores();
    const {keywords} = useKeywords();

    const faction = factions.find(o => o.id === factionId);
    console.log(faction);
    const groupAbilities: AbilityViewerParams[] = abilityGroups.filter(o => !faction || o.factionId === factionId).flatMap(o => o.abilities.map(p => ({ ability: p, abilityGroup: o })));
    
    const filteredWarscrolls = warscrolls.filter(o => (!faction || faction.warscrolls.map(o => o.warscrollId).includes(o.id)))
    const warscrollAbilities: AbilityViewerParams[] = filteredWarscrolls.filter(o=> (!warscrollId ||o.id === warscrollId)).flatMap(o => o.abilities.map(p => ({ ability: p, warscroll: o })));

    const formationAbilities: AbilityViewerParams[] = formations.filter(o => !faction || o.factionId === factionId).flatMap(o => o.abilities.map(p => ({ ability: p, formation: o })));

    const loreAbilities: AbilityViewerParams[] = lores.filter(o => !faction || o.factionId === factionId).flatMap(o => o.abilities.map(p => ({ ability: p, lore: o })));

    const allAbilites: AbilityViewerParams[] = [...groupAbilities, ...warscrollAbilities, ...formationAbilities, ...loreAbilities]

    const viewers = allAbilites.filter(o=> (!warscrollId || o.ability.warscrollId === warscrollId) && (!keywordId || o.ability.keywords.includes(keywordId))).map(o => {
        return <AbilityViewer key={o.ability.id + (o.lore?.id ?? "")} ability={o.ability} abilityGroup={o.abilityGroup} warscroll={o.warscroll} formation={o.formation} lore={o.lore} />
    })

    const handleFactionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedId = event.target.value;
        if(selectedId==="-"){
            setFactionId(undefined);
        }
        setFactionId(selectedId);
    };


    return <Container>
        <Row>
            <Col lg={3} sm={6} xs={12}>
                <Form.Group className="mb-3">
                    <Form.Label>Faction</Form.Label>
                    <Form.Select value={factionId} onChange={handleFactionChange} aria-label="Default select example">
                        <option>-</option>
                        {factions?.map(x => (<option key={x.id} value={x.id}>{x.name}</option>))}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col lg={3} sm={6} xs={12}>
                <Form.Group className="mb-3">
                    <Form.Label>Warscroll</Form.Label>
                    <WarscrollNameAutocomplete suggestions={filteredWarscrolls} setWarscrollId={setWarscrollId}/>
                </Form.Group>
            </Col>
            <Col lg={3} sm={6} xs={12}>
                <Form.Group className="mb-3">
                    <Form.Label>Keyword</Form.Label>
                    <KeywordAutocomplete suggestions={keywords} setKeywordId={setKeywordId}/>
                </Form.Group>
            </Col>
        </Row>

        {viewers}
    </Container>
}

export default AbilityCatalogue;
