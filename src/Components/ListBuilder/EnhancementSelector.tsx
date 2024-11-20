import { useList } from "../../Hooks/useList";
import { Col, Form, Row } from "react-bootstrap";
import Unit from "../../Types/ListTypes/Unit";
import useFactions from "../../Hooks/useFactions";
import { EnrichedWarscroll } from "../../Types/DataTypes/Warscroll";

interface EnhancementSelectorParams {
  unit: Unit | null;
  warscroll: EnrichedWarscroll;
  setUnit: (unit: Unit) => void
};


const EnhancementSelector: React.FC<EnhancementSelectorParams> = ({ unit, warscroll, setUnit }) => {
  const { list, allListUnits } = useList();
  const factions = useFactions();
  if (!list.factionId || !unit) return <></>
  const faction = factions.find(o => o.id === list.factionId);
  const artifactFree = allListUnits.filter(o => o.artifactId).length === 0;
  const traitFree = allListUnits.filter(o => o.heroicTraitId).length === 0;

  const artifactLists = faction?.abilityGroups.filter(o => o.abilityGroupType === "artefactsOfPower") ?? []
  const artifacts = artifactLists.flatMap(o => o.abilities);
  const traitsLists = faction?.abilityGroups.filter(o => o.abilityGroupType === "heroicTraits") ?? []
  const traits = traitsLists.flatMap(o => o.abilities);
  const otherList = faction?.abilityGroups.filter(o => o.abilityGroupType === "otherEnhancements") ?? []

  const compatibleOthes = otherList.filter(o => o.warscrollIds.includes(warscroll.id));

  return <div>
    {(warscroll?.isHero && (artifactFree || unit.artifactId)) && <Form.Group as={Row}>
      <Form.Label column sm={2}>Artifact</Form.Label>
      <Col sm={10}>
        <Form.Select aria-label="Default select example"
          value={unit.artifactId ?? undefined}
          onChange={e => setUnit({ ...unit, artifactId: e.target.value === "-" ? null : e.target.value })}>
          <option value={undefined}>-</option>
          {artifacts.map(x => (<option key={x.id} value={x.id}>{x.name}</option>))}
        </Form.Select>
      </Col>
    </Form.Group>}
    {(warscroll?.isHero && (traitFree || unit.heroicTraitId)) && <Form.Group as={Row}>
      <Form.Label column sm={2}>Heroic Trait</Form.Label>
      <Col sm={10}>
        <Form.Select aria-label="Default select example"
          value={unit.heroicTraitId ?? undefined}
          onChange={e => setUnit({ ...unit, heroicTraitId: e.target.value === "-" ? null : e.target.value })}>
          <option value={undefined}>-</option>
          {traits.map(x => (<option key={x.id} value={x.id}>{x.name}</option>))}
        </Form.Select>
      </Col>
    </Form.Group>}
    {(compatibleOthes.length > 0) && compatibleOthes.map(o => <Form.Group as={Row}>
      <Form.Label column sm={2}>{o.name}</Form.Label>
      <Col sm={10}>
        <Form.Select aria-label="Default select example"
          value={unit.otherEnhancements[o.id] ?? undefined}
          onChange={e => {
            const x = { ...unit.otherEnhancements };
            x[o.id] = e.target.value === "-" ? null : e.target.value;
            setUnit({ ...unit, otherEnhancements: x })
          }}>
          <option value={undefined}>-</option>
          {o.abilities.map(x => (<option key={x.id} value={x.id}>{x.name}</option>))}
        </Form.Select>
      </Col>
    </Form.Group>)}
  </div>
}


export default EnhancementSelector;