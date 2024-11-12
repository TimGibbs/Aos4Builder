import { Accordion, Card } from "react-bootstrap";
import { EnrichedAbility } from "../../Types/DataTypes/Ability";

import abControl from "../../Images/abControl.png"
import abDefensive from "../../Images/abDefensive.png"
import abMovement from "../../Images/abMovement.png"
import abOffensive from "../../Images/abOffensive.png"
import abRallying from "../../Images/abRallying.png"
import abShooting from "../../Images/abShooting.png"
import abSpecial from "../../Images/abSpecial.png"
import abDamaged from "../../Images/abDamage.png"

import './AbilityViewer.css'
import useKeywords from "../../Hooks/useKeywords";
import SpellCost from "./SpellCost";
import PrayerCost from "./PrayerCost";
import { useState } from "react";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import { GiLightningBranches } from "react-icons/gi";
import CpCost from "./CpCost";
import { WarscrollViewer } from "../WarscrollViewer/WarscrollViewer";

export interface AbilityViewerParams {
    ability: EnrichedAbility,
    subtitle?: string
}

export const AbilityViewer: React.FC<AbilityViewerParams> = ({ ability, subtitle }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { dictionary, common } = useKeywords();

    const filteredKeywords = ability.keywords.map(o => dictionary[o])
    let icon: string = "";

    switch (ability.abilityAndCommandIcon) {
        case ("control"): icon = abControl; break;
        case ("defensive"): icon = abDefensive; break;
        case ("movement"): icon = abMovement; break;
        case ("offensive"): icon = abOffensive; break;
        case ("rallying"): icon = abRallying; break;
        case ("shooting"): icon = abShooting; break;
        case ("special"): icon = abSpecial; break;
        case ("battleDamaged"): icon = abDamaged; break;
    }

    const castingCost = !ability.castingValue ? <></>
        : ability.keywords.includes(common.prayer)
            ? <PrayerCost number={ability.castingValue} style={{ height: "2em", width: "2em", marginLeft: "5px", verticalAlign: "top" }} />
            : <SpellCost number={ability.castingValue} style={{ height: "2em", width: "2em", marginLeft: "5px", verticalAlign: "top" }} />;

    const cpCost = !ability.cpCost ? <></>
        : <CpCost number={ability.cpCost} style={{ height: "2em", width: "2em", marginLeft: "5px", verticalAlign: "top" }} />

    const unlimited = ability.keywords.includes(common.unlimited) ? <GiLightningBranches /> : <></>

    return <Card className={`abilityViewer`} style={{ marginBottom: "5px" }}>
        <Card.Header className={`d-flex justify-content-between align-items-center ${ability.phase} abilityViewerHeader`} onClick={() => setIsOpen(!isOpen)}>
            <img src={icon} alt={ability.abilityAndCommandIcon} />
            <span className="flex-grow-1 text-center" style={{ height: "30px" }}>
                <span style={{ fontSize: 20 }}>{unlimited} {ability.name}</span>
                {ability.castingValue && castingCost}
                {cpCost}
            </span>
            {isOpen ? <FaChevronCircleUp className="p-0 ms-auto" /> : <FaChevronCircleDown className="p-0 ms-auto" />}
        </Card.Header>
        <Card.Title style={{ fontSize: 18 }}>
            {ability.phaseDetails}
        </Card.Title>
        <Accordion activeKey={isOpen ? '0' : undefined}>
            <Accordion.Collapse eventKey="0">
                <>
                    {subtitle && <Card.Subtitle>
                        {subtitle}
                    </Card.Subtitle>}
                    <Card.Body style={{ whiteSpace: "pre-wrap" }}>
                        {ability.declare && <>{"Declare: " + ability.declare}<br /></>}
                        {"Effect: " + ability.effect}
                        {ability.warscroll && <WarscrollViewer warscroll={ability.warscroll} includeAbilites={true} />}
                    </Card.Body>
                    <Card.Footer className="text-muted">{filteredKeywords.join(" ")}</Card.Footer>
                </>
            </Accordion.Collapse>
        </Accordion>
    </Card>
};

export default AbilityViewer;