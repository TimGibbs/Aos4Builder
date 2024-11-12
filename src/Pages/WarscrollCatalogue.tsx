import { Col, Container, Form, Row } from "react-bootstrap";
import useWarscrolls from "../Hooks/useWarscrolls";
import useFactions from "../Hooks/useFactions";
import { useState } from "react";
import useKeywords from "../Hooks/useKeywords";
import NameAndIdAutocomplete from "../Components/NameAndIdAutocomplete";
import WarscrollGroupViewer from "../Components/WarscrollGroupViewer";

const WarscrollCatalogue: React.FC = () => {
    const [factionId, setFactionId] = useState<string | undefined>();
    const [warscrollId, setWarscrollId] = useState<string | undefined>();
    const [keywordId, setKeywordId] = useState<string | undefined>();

    const factions = useFactions();
    const { dictionary} = useWarscrolls();
    const { keywords } = useKeywords();

    const filteredFactions = factions.filter(o=>!factionId || o.id === factionId)

    const warscrollGroups = filteredFactions.map(o=> {
        return {id:o.id, name: o.name, warscrolls:o.warscrolls.map(p=>dictionary[p.warscrollId]).filter(p=>(!warscrollId || p.id === warscrollId)
            && (!keywordId || p.keywords.includes(keywordId))) };
    }).filter(o=>o.warscrolls.length > 0);

    const handleFactionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedId = event.target.value;
        if (selectedId === "-") {
            setFactionId(undefined);
        }
        setFactionId(selectedId);
    };

    const viewers = warscrollGroups.map(o => <WarscrollGroupViewer key={o.id} warscrollGroup={o} includeAbilities={true}/>)

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
                    <NameAndIdAutocomplete suggestions={warscrollGroups.flatMap(o=>o.warscrolls)} setId={setWarscrollId} />
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

export default WarscrollCatalogue;
