import { Accordion, Card } from "react-bootstrap"
import { EnrichedWarscroll } from "../../Hooks/useWarscrolls"
import { useState } from "react";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import useWeaponAbilities from "../../Hooks/useWeaponAbilities";
import AbilityViewer from "../AbilityViewer/AbilityViewer";
import './WarscrollViewer.css';
import useIsMobile from "../../Hooks/useIsMobile";
import MobileWeaponsSection from "./MobileWeaponsSection";
import DesktopWeaponsSection from "./DesktopWeaponsSection";
import WarscrollStatsSection from "./WarscrollStatsSection";

export interface WarscrollViewerParams {
    warscroll: EnrichedWarscroll,
    includeAbilites: boolean
}

export const WarscrollViewer: React.FC<WarscrollViewerParams> = ({ warscroll, includeAbilites }) => {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const weaponAbilites = useWeaponAbilities();

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
                        {!isMobile && warscroll.weapons.length > 0 && <DesktopWeaponsSection weapons={warscroll.weapons} weaponAbilites={weaponAbilites} />}
                        {isMobile && warscroll.weapons.length > 0 && <MobileWeaponsSection weapons={warscroll.weapons} weaponAbilites={weaponAbilites} />}
                        {includeAbilites && warscroll.abilities.map(o => <AbilityViewer key={o.id} ability={o} />)}
                    </Card.Body>
                    <Card.Footer className="text-muted">{warscroll.referenceKeywords}</Card.Footer>
                </>
            </Accordion.Collapse>
        </Accordion>
    </Card>
}

export default WarscrollViewer;