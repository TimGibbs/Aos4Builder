import { Card } from "react-bootstrap";
import { EnrichedAbility } from "../Types/DataTypes/Ability";
import AbilityGroup from "../Types/DataTypes/AbilityGroup";
import Warscroll from "../Types/DataTypes/Warscroll";
import Formation from "../Types/DataTypes/Formation";
import Lore from "../Types/DataTypes/Lore";

import abControl from "../Images/abControl.png"
import abDefensive from "../Images/abDefensive.png"
import abMovement from "../Images/abMovement.png"
import abOffensive from "../Images/abOffensive.png"
import abRallying from "../Images/abRallying.png"
import abShooting from "../Images/abShooting.png"
import abSpecial from "../Images/abSpecial.png"
import abDamaged from "../Images/abDamage.png"

import './AbilityViewer.css'
import useKeywords from "../Hooks/useKeywords";

export interface AbilityViewerParams {
    ability: EnrichedAbility,
    abilityGroup?: AbilityGroup | undefined,
    warscroll?: Warscroll | undefined
    formation?: Formation | undefined
    lore?: Lore | undefined
}

export const AbilityViewer: React.FC<AbilityViewerParams> = ({ ability, abilityGroup, warscroll, formation, lore }) => {

    const { dictionary } = useKeywords();

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

    return <Card className={`abilityViewer`} >
        <Card.Header className={ability.phase}>
            <img src={icon} alt={ability.abilityAndCommandIcon} />
            {ability.phaseDetails}
        </Card.Header>
        <Card.Title>
            {ability.name} {ability.cpCost ? `${ability.cpCost}cp` : ""}
        </Card.Title>
        <Card.Subtitle>
            {abilityGroup?.name}
            {warscroll?.name}
            {formation?.name}
            {lore?.name}
        </Card.Subtitle>
        <Card.Body>
            {ability.effect}
        </Card.Body>
        <Card.Footer className="text-muted">{filteredKeywords.join(" ")}</Card.Footer>
    </Card>
};

export default AbilityViewer;