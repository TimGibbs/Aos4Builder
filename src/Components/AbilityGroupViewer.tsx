import { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import MemoizedAbilityViewer from "./AbilityViewer/MemoizedAbilityViewer";

export interface AbilityGroupViewerParams {
    abilityGroup: {
        abilityIds: string[]
        name: string
    }
}

export const AbilityGroupViewer: React.FC<AbilityGroupViewerParams> = ({ abilityGroup }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    if(abilityGroup.abilityIds.length === 1) return <MemoizedAbilityViewer abilityId={abilityGroup.abilityIds[0]}  subtitle={abilityGroup.name}/>

    return <Card className={`abilityGroupViewer`} style={{ marginBottom: "5px" }}>
        <Card.Header className={`d-flex justify-content-between align-items-center`} onClick={() => setIsOpen(!isOpen)}>
            <span className="flex-grow-1 text-center" style={{ height: "30px" }}>
                <span style={{ fontSize: 20 }}>{abilityGroup.name}</span>
            </span>
            {isOpen ? <FaChevronCircleUp className="p-0 ms-auto" /> : <FaChevronCircleDown className="p-0 ms-auto" />}
        </Card.Header>
        <Accordion activeKey={isOpen ? '0' : undefined}>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    {abilityGroup.abilityIds.map(o => <MemoizedAbilityViewer key={o} abilityId={o} />)}
                </Card.Body>
            </Accordion.Collapse>
        </Accordion>
    </Card>
};

export default AbilityGroupViewer;