import { Card, Form } from "react-bootstrap";
import { useList } from "../../Hooks/useList";
import { useData } from "../../Hooks/useData";

const FormationSelector: React.FC = () => {
  const { list, setFormation } = useList()
  const data = useData();

  const faction = list.factionId ? data.factions[list.factionId] : null;
  const formations = faction?.formationIds.map(o=>data.formations[o]);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedFormation = formations?.find(x => x.id === selectedId) || null;
    setFormation(selectedFormation);
  };
  if (formations?.length === 0) return <></>
  return <Card>
    <Card.Title>
      Formation
    </Card.Title>
    <Card.Body>
      <Form.Select value={list.formationId ?? undefined} onChange={handleSelectChange} aria-label="Default select example">
        <option>-</option>
        {formations?.map(x => (<option key={x.id} value={x.id}>{x.name}</option>))}
      </Form.Select>
    </Card.Body>
  </Card>
}

export default FormationSelector;