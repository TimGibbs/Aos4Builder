import { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import { EnrichedWarscroll } from "../Hooks/useWarscrolls";
import WarscrollViewer from "./WarscrollViewer/WarscrollViewer";

export interface WarscrollGroupViewerParams {
    warscrollGroup: {
        warscrolls: EnrichedWarscroll[]
        name: string
    }
    includeAbilities: boolean
}

export const WarscrollGroupViewer: React.FC<WarscrollGroupViewerParams> = ({ warscrollGroup, includeAbilities }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    if(warscrollGroup.warscrolls.length === 1) return <WarscrollViewer warscroll={warscrollGroup.warscrolls[0]} includeAbilites={includeAbilities}/>

    return <Card className={`abilityGroupViewer`} style={{ marginBottom: "5px" }}>
        <Card.Header className={`d-flex justify-content-between align-items-center`} onClick={() => setIsOpen(!isOpen)}>
            <span className="flex-grow-1 text-center" style={{ height: "30px" }}>
                <span style={{ fontSize: 20 }}>{warscrollGroup.name}</span>
            </span>
            {isOpen ? <FaChevronCircleUp className="p-0 ms-auto" /> : <FaChevronCircleDown className="p-0 ms-auto" />}
        </Card.Header>
        <Accordion activeKey={isOpen ? '0' : undefined}>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    {warscrollGroup.warscrolls.map(o => <WarscrollViewer key={o.id} warscroll={o} includeAbilites={includeAbilities} />)}
                </Card.Body>
            </Accordion.Collapse>
        </Accordion>
    </Card>
};

export default WarscrollGroupViewer;