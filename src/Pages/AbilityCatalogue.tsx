import { Col, Container, Form, Row } from "react-bootstrap";
import AbilityViewer, { AbilityViewerParams } from "../Components/AbilityViewer/AbilityViewer";
import useWarscrolls from "../Hooks/useWarscrolls";
import useFactions from "../Hooks/useFactions";
import { useState } from "react";
import useKeywords from "../Hooks/useKeywords";
import NameAndIdAutocomplete from "../Components/NameAndIdAutocomplete";
import { useData } from "../Hooks/useData";

const AbilityCatalogue: React.FC = () => {
    const [factionId, setFactionId] = useState<string | undefined>();
    const [warscrollId, setWarscrollId] = useState<string | undefined>();
    const [keywordId, setKeywordId] = useState<string | undefined>();
    const [abilityId, setAbilityId] = useState<string | undefined>();

    const factions = useFactions();
    const warscrolls = useWarscrolls();
    const { keywords } = useKeywords();

    const data = useData();

    const faction = factions.find(o => o.id === factionId);
    const filteredWarscrolls = warscrolls.filter(o => (!faction || faction.warscrolls?.map(o => o.warscrollId).includes(o.id)))

    const finalFilter = (o: AbilityViewerParams): boolean => (!abilityId || o.abilityId === abilityId);

    const allAbilites = Object.values(data.allAbilities)

    const allIds : AbilityViewerParams[] = allAbilites.map(p => ({ abilityId: p.id, subtitle: "" }))


    const viewers = allIds.filter(finalFilter).map(o => {
        return <AbilityViewer key={o.abilityId} abilityId={o.abilityId} subtitle={o.subtitle} />
    })

    const handleFactionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedId = event.target.value;
        if (selectedId === "-") {
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
                    <Form.Label>Name</Form.Label>
                    <NameAndIdAutocomplete suggestions={allAbilites} setId={setAbilityId} />
                </Form.Group>
            </Col>
            <Col lg={3} sm={6} xs={12}>
                <Form.Group className="mb-3">
                    <Form.Label>Warscroll</Form.Label>
                    <NameAndIdAutocomplete suggestions={filteredWarscrolls} setId={setWarscrollId} />
                </Form.Group>
            </Col>
            <Col lg={3} sm={6} xs={12}>
                <Form.Group className="mb-3">
                    <Form.Label>Keyword</Form.Label>
                    <NameAndIdAutocomplete suggestions={keywords} setId={setKeywordId} />
                </Form.Group>
            </Col>
        </Row>

        {viewers}
    </Container>
}

export default AbilityCatalogue;
