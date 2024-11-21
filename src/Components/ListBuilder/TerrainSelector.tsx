import { useList } from "../../Hooks/useList";
import { Button, Card } from "react-bootstrap";
import UnitBuilder from "./UnitBuilder";
import { defaultUnit } from "../../Types/ListTypes/Unit";
import { useData } from "../../Hooks/useData";


const TerrainSelector: React.FC = () => {
    const { list, setTerrain } = useList();

    const data = useData();

    if (!list.factionId) return <></>

    const faction = list.factionId ? data.factions[list.factionId] : null;
    const warscrollIds = [...new Set<string>(faction?.warscrollIds)]
    const factionTerrain = warscrollIds.map(o=>data.warscrolls[o]).filter(o =>o.isTerrain);

    if (!factionTerrain || factionTerrain.length === 0) return <></>
    return <Card>
        <Card.Title>
            Terrain
        </Card.Title>
        <Card.Body>
            {!list.terrain && <Button onClick={() => setTerrain(defaultUnit())} >Add</Button>}
            {list.terrain && <UnitBuilder unit={list.terrain} warscrolls={factionTerrain}
                setUnit={(w) => setTerrain(w)}
            ></UnitBuilder>}
        </Card.Body>
    </Card>
}

export default TerrainSelector;