import { useList } from "../../Hooks/useList";
import { Button, Card } from "react-bootstrap";
import useFactions from "../../Hooks/useFactions";
import useWarscrolls from "../../Hooks/useWarscrolls";
import UnitBuilder from "./UnitBuilder";
import { defaultUnit } from "../../Types/ListTypes/Unit";


const TerrainSelector: React.FC = () => {
    const { list, setTerrain } = useList();
    const factions = useFactions();
    const warscrolls = useWarscrolls()
    if (!list.factionId) return <></>

    const faction = factions.find(o => o.id === list.factionId)
    const warscrollIds = new Set<string>(faction?.warscrolls.map(o => o.warscrollId))
    const factionTerrain = warscrolls.filter(o => warscrollIds.has(o.id) && o.isTerrain);

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