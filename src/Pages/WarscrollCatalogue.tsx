import { Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import NameAndIdAutocomplete from "../Components/NameAndIdAutocomplete";
import { WarscrollViewer } from "../Components/WarscrollViewer/WarscrollViewer";
import { useData } from "../Hooks/useData";

const WarscrollCatalogue: React.FC = () => {
    const [factionId, setFactionId] = useState<string | undefined>();
    const [warscrollId, setWarscrollId] = useState<string | undefined>();
    const [keywordId, setKeywordId] = useState<string | undefined>();

    const data = useData();
    const keywords = Object.values(data.keywords)

    const factions = Object.values(data.factions);
    const faction = factionId ? data.factions[factionId] : null;
    const warscrolls = Object.values(data.warscrolls);
    const filteredWarscrolls = (faction ? faction.warscrollIds.map(o=> data.warscrolls[o]) : warscrolls)
    .filter(o => (!warscrollId || o.id === warscrollId)
    && (!keywordId || o.keywords.includes(keywordId)))

    const handleFactionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const selectedId = event.target.value;
        if (selectedId === "-") {
            setFactionId(undefined);
        }
        setFactionId(selectedId);
    };

    const viewers = filteredWarscrolls.map(o => <WarscrollViewer key={o.id} warscrollId={o.id} includeAbilites={true} />)

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

export default WarscrollCatalogue;
