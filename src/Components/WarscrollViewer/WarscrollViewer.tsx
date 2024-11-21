import { Accordion, Card } from "react-bootstrap"
import { useState } from "react";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import AbilityViewer from "../AbilityViewer/AbilityViewer";
import './WarscrollViewer.css';
import useIsMobile from "../../Hooks/useIsMobile";
import MobileWeaponsSection from "./MobileWeaponsSection";
import DesktopWeaponsSection from "./DesktopWeaponsSection";
import WarscrollStatsSection from "./WarscrollStatsSection";
import { useData } from "../../Hooks/useData";

export interface WarscrollViewerParams {
    warscrollId: string,
    includeAbilites: boolean
}

export const WarscrollViewer: React.FC<WarscrollViewerParams> = ({ warscrollId, includeAbilites }) => {
    const isMobile = useIsMobile();
    const data = useData();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const warscroll = data.warscrolls[warscrollId];
    return <Card className={`warscrollViewer`} style={{ marginBottom: "5px" }}>
        <Card.Header className={`d-flex justify-content-between align-items-center warscrollViewerHeader`} onClick={() => setIsOpen(!isOpen)}>
            <span className="flex-grow-1 text-center" style={{ height: "30px" }}>
                <span style={{ fontSize: 20 }}>{warscroll.name}</span>
            </span>
            {isOpen ? <FaChevronCircleUp className="p-0 ms-auto" /> : <FaChevronCircleDown className="p-0 ms-auto" />}
        </Card.Header>
        <Accordion activeKey={isOpen ? '0' : undefined}>
            <Accordion.Collapse eventKey="0">
                <>
                    <Card.Body style={{ whiteSpace: "pre-wrap" }}>
                        <WarscrollStatsSection warscroll={warscroll} />
                        {!isMobile && warscroll.weaponIds && warscroll.weaponIds?.length > 0 && <DesktopWeaponsSection weaponIds={warscroll.weaponIds} />}
                        {isMobile && warscroll.weaponIds && warscroll.weaponIds?.length > 0 && <MobileWeaponsSection weaponIds={warscroll.weaponIds} />}
                        {includeAbilites && warscroll.abilityIds?.map(o => <AbilityViewer key={o} abilityId={o} />)}
                    </Card.Body>
                    <Card.Footer className="text-muted">{warscroll.referenceKeywords}</Card.Footer>
                </>
            </Accordion.Collapse>
        </Accordion>
    </Card>
}

export default WarscrollViewer;