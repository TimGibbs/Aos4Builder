import { useList } from "../../Hooks/useList";
import { Col, Form, Row } from "react-bootstrap";
import Unit from "../../Types/ListTypes/Unit";
import useFactions from "../../Hooks/useFactions";

interface EnhancementSelectorParams {
  unit : Unit | null;
};


const EnhancementSelector: React.FC<EnhancementSelectorParams> = ({ unit }) =>{
    const {list, setUnitArtifact, setUnitTrait, allListUnits } = useList();
    const factions = useFactions();
    if(!list.factionId || !unit) return <></>
    const faction = factions.find(o=>o.id=== list.factionId);
    const artifactFree = allListUnits.filter(o=>o.artifactId).length ===0;
    const traitFree = allListUnits.filter(o=>o.heroicTraitId).length ===0;

    const artifactLists = faction?.abilityGroups.filter(o=>o.abilityGroupType==="artefactsOfPower") ?? []
    const artifacts = artifactLists.flatMap(o=>o.abilities);
    const traitsLists = faction?.abilityGroups.filter(o=>o.abilityGroupType==="heroicTraits") ?? []
    const traits = traitsLists.flatMap(o=>o.abilities);

    return <div>
      {(artifactFree || unit.artifactId ) && <Form.Group as={Row}>
          <Form.Label column sm={2}>Artifact</Form.Label> 
            <Col sm={10}>
              <Form.Select aria-label="Default select example" 
                value={unit.artifactId?? undefined}
                onChange={e=>setUnitArtifact(unit?.id,e.target.value === "-" ? null : e.target.value)}>
                <option value={undefined}>-</option>
                {artifacts.map(x=>(<option key={x.id} value={x.id}>{x.name}</option>))}
              </Form.Select>
            </Col>
        </Form.Group>}
      {(traitFree || unit.heroicTraitId ) && <Form.Group as={Row}>
          <Form.Label column sm={2}>Heroic Trait</Form.Label> 
            <Col sm={10}>
              <Form.Select aria-label="Default select example" 
                value={unit.heroicTraitId?? undefined}
                onChange={e=>setUnitTrait(unit?.id,e.target.value === "-" ? null : e.target.value)}>
                <option value={undefined}>-</option>
                {traits.map(x=>(<option key={x.id} value={x.id}>{x.name}</option>))}
              </Form.Select>
            </Col>
        </Form.Group>}
    </div>
}


export default EnhancementSelector;