import { useList } from "../../Hooks/useList";
import { Button, Card } from "react-bootstrap";
import RegimentBuilder from "./RegimentBuilder";
import { defaultRegiment } from "../../Types/ListTypes/Regiment"


const RegimentsSelector: React.FC = () => {
        const { list, addRegiment, setRegiment } = useList();

        if (!list.factionId) return <></>
        return <Card>
                <Card.Title>
                        Regiments
                </Card.Title>
                <Card.Body>
                        {list.regiments.map(r => <RegimentBuilder key={r.id} regiment={r} setRegiment={setRegiment} />)}
                        <Button onClick={() => addRegiment(defaultRegiment(list.regiments.length))}>Add Regiment</Button>
                </Card.Body>
        </Card>
}

export default RegimentsSelector;