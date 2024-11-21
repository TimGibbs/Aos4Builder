import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import Faction from "../../Types/DataTypes/Faction";
import { useList } from "../../Hooks/useList";
import { useData } from "../../Hooks/useData";

const FactionSelector: React.FC = () => {
  const data = useData();
  const factions = Object.values(data.factions);
  factions.sort((a, b) => a.name.localeCompare(b.name))
  return <Card>
    <Card.Title>
      Faction
    </Card.Title>
    <Card.Body>
      <InternalFactionSelector factions={factions} />
    </Card.Body>
  </Card>
}

interface FactionSelectorParams {
  factions: Faction[],
};

const InternalFactionSelector: React.FC<FactionSelectorParams> = ({ factions }) => {
  const { list, setFaction } = useList();
  const [fact, setFact] = useState<Faction | null>();

  const data = useData();
  const allFactions = Object.values(data.factions);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedFaction = factions.find(x => x.id === selectedId) || null;
    setFact(selectedFaction)
    setFaction(selectedFaction);
  };
  const subFactions = allFactions.filter(o => o.parentFactionKeywordId === fact?.id)
  const showSub = fact && subFactions && subFactions.length > 0;
  return <><div><Form.Select value={list.factionId ?? undefined} onChange={handleSelectChange} aria-label="Default select example">
    <option>-</option>
    {factions.map(x => (<option key={x.id} value={x.id}>{x.name}</option>))}
  </Form.Select>
  </div>
    {showSub && <InternalFactionSelector
      factions={subFactions} />}
  </>
}

export default FactionSelector;