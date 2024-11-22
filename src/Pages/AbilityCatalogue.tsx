import { Col, Container, Form, Row } from "react-bootstrap";
import { AbilityViewerParams } from "../Components/AbilityViewer/AbilityViewer";
import { useState } from "react";
import NameAndIdAutocomplete from "../Components/NameAndIdAutocomplete";
import { useData } from "../Hooks/useData";
import MemoizedAbilityViewer from "../Components/AbilityViewer/MemoizedAbilityViewer";

const AbilityCatalogue: React.FC = () => {
    const [factionId, setFactionId] = useState<string | undefined>();
    const [, setWarscrollId] = useState<string | undefined>();
    const [, setKeywordId] = useState<string | undefined>();
    const [abilityId, setAbilityId] = useState<string | undefined>();

    const data = useData();
    const keywords = Object.values(data.keywords)

    const factions = Object.values(data.factions);

    const faction = factionId ? data.factions[factionId] : null;

    const warscrolls = faction 
        ? faction.warscrollIds.map(o=>data.warscrolls[o]) 
        : Object.values(data.warscrolls) 

    
    const finalFilter = (o: AbilityViewerParams): boolean => (!abilityId || o.abilityId === abilityId);

    const allAbilites = Object.values(data.allAbilities)

    const allIds : AbilityViewerParams[] = allAbilites.map(p => ({ abilityId: p.id, subtitle: "" }))


    const viewers = allIds.filter(finalFilter).map(o => {
        return <MemoizedAbilityViewer key={o.abilityId} abilityId={o.abilityId} subtitle={o.subtitle} />
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
                    <NameAndIdAutocomplete suggestions={warscrolls} setId={setWarscrollId} />
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
