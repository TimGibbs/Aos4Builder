import { Col, Container, Form, Row } from "react-bootstrap";
import AbilityViewer, { AbilityViewerParams } from "../Components/AbilityViewer/AbilityViewer";
import useAbilityGroups from "../Hooks/useAbilityGroups";
import useWarscrolls from "../Hooks/useWarscrolls";
import useFormations from "../Hooks/useFormations";
import useLores from "../Hooks/useLores";
import useFactions from "../Hooks/useFactions";
import { useState } from "react";
import useKeywords from "../Hooks/useKeywords";
import NameAndIdAutocomplete from "../Components/NameAndIdAutocomplete";

const AbilityCatalogue: React.FC = () => {
    const [factionId, setFactionId] = useState<string | undefined>();
    const [warscrollId, setWarscrollId] = useState<string | undefined>();
    const [keywordId, setKeywordId] = useState<string | undefined>();
    const [abilityId, setAbilityId] = useState<string | undefined>();

    const factions = useFactions();
    const { abilityGroups } = useAbilityGroups();
    const { warscrolls } = useWarscrolls();
    const formations = useFormations();
    const lores = useLores();
    const { keywords } = useKeywords();

    const faction = factions.find(o => o.id === factionId);
    const filteredWarscrolls = warscrolls.filter(o => (!faction || faction.warscrolls.map(o => o.warscrollId).includes(o.id)))
    const filteredGroupAbilities = abilityGroups.filter(o => !faction || o.factionId === factionId)
    const filteredFormations = formations.filter(o => !faction || o.factionId === factionId)
    const filteredLores = lores.filter(o => !faction || o.factionId === factionId)

    const finalFilter = (o: AbilityViewerParams): boolean => (!warscrollId || o.ability.warscrollId === warscrollId)
        && (!keywordId || o.ability.keywords.includes(keywordId))
        && (!abilityId || o.ability.id === abilityId);


    const furtherFilteredWarscrolls = filteredWarscrolls.filter(o => (!warscrollId || o.id === warscrollId));

    const warscrollAbilities: AbilityViewerParams[] = furtherFilteredWarscrolls.flatMap(o => o.abilities.map(p => ({ ability: p, subtitle: o.name })));
    const groupAbilities: AbilityViewerParams[] = filteredGroupAbilities.flatMap(o => o.abilities.map(p => ({ ability: p, subtitle: o.name })));
    const formationAbilities: AbilityViewerParams[] = filteredFormations.flatMap(o => o.abilities.map(p => ({ ability: p, subtitle: o.name })));
    const loreAbilities: AbilityViewerParams[] = filteredLores.flatMap(o => o.abilities.map(p => ({ ability: p, subtitle: o.name })));
    const allAbilites: AbilityViewerParams[] = [...groupAbilities, ...warscrollAbilities, ...formationAbilities, ...loreAbilities]

    const viewers = allAbilites.filter(finalFilter).map(o => {
        return <AbilityViewer key={o.ability.id} ability={o.ability} subtitle={o.subtitle} />
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
                    <NameAndIdAutocomplete suggestions={allAbilites.map(o => o.ability)} setId={setAbilityId} />
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
