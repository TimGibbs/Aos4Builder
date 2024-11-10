import { Container, Form } from "react-bootstrap";
import AbilityViewer, { AbilityViewerParams } from "../Components/AbilityViewer";
import useAbilityGroups from "../Hooks/useAbilityGroups";
import useWarscrolls from "../Hooks/useWarscrolls";
import useFormations from "../Hooks/useFormations";
import useLores from "../Hooks/useLores";
import useFactions from "../Hooks/useFactions";
import { useState } from "react";

const AbilityCatalogue : React.FC = ()=> {
    const [factionId, setFactionId] = useState<string|undefined>();

    const factions = useFactions();
    const abilityGroups = useAbilityGroups();
    const warscrolls = useWarscrolls();
    const formations = useFormations();
    const lores = useLores();

    const faction = factions.find(o=>o.id === factionId);
    const groupAbilities : AbilityViewerParams[] = abilityGroups.filter(o=>!factionId || o.factionId===factionId).flatMap(o=>o.abilities.map(p=> ({ability:p, abilityGroup:o})));
;
    const warscrollAbilities : AbilityViewerParams[] =warscrolls.filter(o=>!faction || faction.warscrolls.map(o=>o.warscrollId).includes(o.id)).flatMap(o=>o.abilities.map(p=> ({ability:p, warscroll:o})));

    const formationAbilities : AbilityViewerParams[] = formations.filter(o=>!factionId || o.factionId===factionId).flatMap(o=>o.abilities.map(p=> ({ability:p, formation:o})));

    const loreAbilities : AbilityViewerParams[] = lores.filter(o=>!factionId || o.factionId===factionId).flatMap(o=>o.abilities.map(p=> ({ability:p, lore:o})));

    const allAbilites : AbilityViewerParams[] = [...groupAbilities, ...warscrollAbilities, ...formationAbilities, ...loreAbilities]

    const viewers = allAbilites.map(o=>{
        return <AbilityViewer ability={o.ability} abilityGroup={o.abilityGroup} warscroll={o.warscroll} formation={o.formation} lore={o.lore} />
    })

    const handleFactionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        setFactionId(selectedId);
      };


    return <Container>
        <Form.Group className="mb-3">
            <Form.Label>Faction</Form.Label>
            <Form.Select value={factionId} onChange={handleFactionChange} aria-label="Default select example">
            <option>-</option>
            {factions?.map(x=>(<option key={x.id} value={x.id}>{x.name}</option>))}
            </Form.Select>
        </Form.Group>
        {viewers}
    </Container>
}

export default AbilityCatalogue;