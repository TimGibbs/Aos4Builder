import { useList } from "../../Hooks/useList";
import { Card, Col, Form, Row } from "react-bootstrap";
import Lore from "../../Types/DataTypes/Lore";
import { useEffect, useMemo, useState } from "react";
import useLores from "../../Hooks/useLores";

const LoreSelector: React.FC = () => {
  const { list, setPrayerLore, setSpellLore, setManifestationLore } = useList();
  const allLores = useLores()

  const lores = useMemo(() => {
    const filtered = allLores.filter(o => o.factionId === null || o.factionId === list.factionId) ?? [];
    return { prayers: filtered.filter(o => o.loreType === "prayer"), spells: filtered.filter(o => o.loreType === "spell"), manifestations: filtered.filter(o => o.loreType === "summon") };
  }, [list.factionId, allLores])


  const prayer = allLores.find(o => o.id === list.prayerLoreId)!
  const spell = allLores.find(o => o.id === list.spellLoreId)!
  const mani = allLores.find(o => o.id === list.manifestationLoreId)!
  return <Card>
    <Card.Title>
      Lores
    </Card.Title>
    <Card.Body>
      {lores.prayers.length > 0 && <Form.Group as={Row}>
        <Form.Label column sm={2}>Prayers</Form.Label>
        <Col sm={10}>
          <LoreSelectorInternal selected={prayer} lores={lores.prayers}
            selectLore={(w) => setPrayerLore(w)}
            deselect={() => setPrayerLore(null)} />
        </Col>
      </Form.Group>}
      {lores.spells.length > 0 && <Form.Group as={Row}>
        <Form.Label column sm={2}>Spells</Form.Label>
        <Col sm={10}>
          <LoreSelectorInternal selected={spell} lores={lores.spells}
            selectLore={(w) => setSpellLore(w)}
            deselect={() => setSpellLore(null)} />
        </Col>
      </Form.Group>}
      {lores.manifestations.length > 0 && <Form.Group as={Row}>
        <Form.Label column sm={2}>Manifestations</Form.Label>
        <Col sm={10}>
          <LoreSelectorInternal selected={mani} lores={lores.manifestations}
            selectLore={(w) => setManifestationLore(w)}
            deselect={() => setManifestationLore(null)} />
        </Col>
      </Form.Group>}
    </Card.Body>
  </Card>
}

interface LoreSelectorInternalParams {
  selected: Lore | null;
  lores: Lore[];
  selectLore: (lore: Lore) => void;
  deselect: () => void;
};

const LoreSelectorInternal: React.FC<LoreSelectorInternalParams> = ({ selected, lores, selectLore, deselect }) => {
  const [selectedItem, setSelctedItem] = useState<string | undefined>();

  useEffect(() => { setSelctedItem(selected?.id ?? "") }, [selected])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelctedItem(selectedId);
    const selectedWarscroll = lores.find(x => x.id === selectedId) || null;
    if (!!selectedWarscroll) {
      selectLore(selectedWarscroll);
    } else {
      deselect()
    }
    setSelctedItem("");
  };
  return <div><Form.Select value={selectedItem} onChange={handleSelectChange} aria-label="Default select example">
    <option>-</option>
    {lores.map(x => (<option key={x.id} value={x.id}>{x.name}</option>))}
  </Form.Select>
  </div>
}

export default LoreSelector;