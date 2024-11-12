import { useList } from "../../Hooks/useList";
import { Card } from "react-bootstrap";
import { regimentSum } from "../../Logic/pointSums";
import useFactions from "../../Hooks/useFactions";
import useWarscrolls from "../../Hooks/useWarscrolls";
import UnitBuilder from "./UnitBuilder";
import Regiment from "../../Types/ListTypes/Regiment";
import Unit from "../../Types/ListTypes/Unit";
import RegimentItemBuilder from "./RegimentOptionBuilder";
import RegimentItem, { defaultRegimentItem } from "../../Types/ListTypes/RegimentItem";


interface RegimentBuilderParams {
    regiment: Regiment,
    setRegiment: (regiment: Regiment) => void
};

const RegimentBuilder: React.FC<RegimentBuilderParams> = ({ regiment, setRegiment }) => {
    const { list } = useList();
    const factions = useFactions();
    const {dictionary} = useWarscrolls();

    const faction = factions.find(o => o.id === list.factionId)
    const factionWarscrolls = faction?.warscrolls.map(o=>dictionary[o.warscrollId]) ?? [];

    if (!faction) return <></>

    const general = factionWarscrolls.find(o => o.id === faction?.rosterFactionKeywordRequiredGeneralWarscrollId);
    const warscrolls = faction?.rosterFactionKeywordRequiredGeneralWarscrollId && regiment.isGeneral ? general ? [general] : [] : factionWarscrolls.filter(o => o.isHero) ?? [];
    const setLeader = (unit: Unit): void => {
        const warscroll = warscrolls.find(o => o.id === unit.warscrollId);
        const items = warscroll?.regimentOptions.map(o => defaultRegimentItem(o.id)) ?? [];
        setRegiment({ ...regiment, leader: unit, regimentItems: items })
    }

    const setItem = (regimentItem: RegimentItem): void => {
        const i = regiment.regimentItems.findIndex(o => o.id === regimentItem.id);
        const items = [...regiment.regimentItems]
        items[i] = regimentItem;
        setRegiment({ ...regiment, regimentItems: items })
    }

    return <Card>
        <Card.Body>
            <h6>{regimentSum(regiment, factionWarscrolls)}pts</h6>
            <h6>{regiment.isGeneral ? "General" : "Leader"}</h6>
            <UnitBuilder unit={regiment.leader} setUnit={setLeader} warscrolls={warscrolls} />
            {regiment.leader && <>
                {regiment.regimentItems.map((o, i) => <RegimentItemBuilder key={o.id} item={o} setItem={setItem} />)}
            </>}
        </Card.Body>
    </Card>
}



export default RegimentBuilder;