import { Accordion, Card } from "react-bootstrap"
import { EnrichedWarscroll } from "../../Hooks/useWarscrolls"
import { useState } from "react";
import useKeywords from "../../Hooks/useKeywords";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";

export interface WarscrollViewerParams {
    warscroll: EnrichedWarscroll,
}

export const WarscrollViewer: React.FC<WarscrollViewerParams> = ({ warscroll }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { dictionary } = useKeywords();

    const filteredKeywords = warscroll.keywords.map(o => dictionary[o])

    return <Card className={`warscrollViewer`} style={{ marginBottom: "5px" }}>
        <Card.Header className={`d-flex justify-content-between align-items-center`} onClick={() => setIsOpen(!isOpen)}>
            <span className="flex-grow-1 text-center" style={{ height: "30px" }}>
                <span style={{ fontSize: 20 }}>{warscroll.name}</span>
            </span>
            {isOpen ? <FaChevronCircleUp className="p-0 ms-auto" /> : <FaChevronCircleDown className="p-0 ms-auto" />}
        </Card.Header>
        <Accordion activeKey={isOpen ? '0' : undefined}>
            <Accordion.Collapse eventKey="0">
                <>
                <Card.Body style={{ whiteSpace: "pre-wrap" }}>
                        {warscroll.save}
                    </Card.Body>
                    <Card.Footer className="text-muted">{filteredKeywords.join(" ")}</Card.Footer>
                </>
            </Accordion.Collapse>
        </Accordion>
    </Card>
}