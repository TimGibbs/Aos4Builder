import { Button } from "react-bootstrap";
import { regimentItemSum } from "../../Logic/pointSums";
import RegimentItem from "../../Types/ListTypes/RegimentItem"
import Unit, { defaultUnit } from "../../Types/ListTypes/Unit";
import UnitBuilder from "./UnitBuilder";
import { useList } from "../../Hooks/useList";
import { EnrichedWarscroll } from "../../Types/DataTypes/Warscroll";
import { useData } from "../../Hooks/useData";

interface RegimentItemParams {
    item: RegimentItem
    setItem: (item: RegimentItem) => void;
}

const RegimentItemBuilder: React.FC<RegimentItemParams> = ({ item, setItem }) => {
    const { list } = useList();

    const data = useData();
    const allWarscrolls = Object.values(data.warscrolls);
    const faction = list.factionId ? data.factions[list.factionId] : null;
    const factionIds = new Set<string>(faction?.warscrollIds)
    const option = data.warscrollRegimentOptions[item.warscrollRegimentOptionId];

    const max = option?.childQuantity !== "any" ? 1 : 1000;
    const isRequiredWarscroll = (warscroll: EnrichedWarscroll) => (option?.requiredWarscrollId && option.requiredWarscrollId === warscroll.id);
    const hasIncludedKeywords = (warscroll: EnrichedWarscroll) => !option?.requiredWarscrollId && option?.required.every(k => warscroll.keywords.includes(k));
    const doesntHaveExcludedKeywords = (warscroll: EnrichedWarscroll) => warscroll.keywords.every(k => !option?.excluded.includes(k));
    const filter = (warscroll: EnrichedWarscroll) => factionIds.has(warscroll.id) && !warscroll.isTerrain && !warscroll.isManifestation && (isRequiredWarscroll(warscroll) ||
        (hasIncludedKeywords(warscroll) && doesntHaveExcludedKeywords(warscroll)));

    const warscolls = allWarscrolls.filter(o => filter(o))

    const setUnit = (unit: Unit): void => {
        const i = item.units.findIndex(o => o.id === unit.id);
        const units = [...item.units]
        units[i] = unit;
        setItem({ ...item, units: units })
    }
    if (warscolls.length === 0) return <></>
    return <>
        <h6>{option?.optionText} {regimentItemSum(item, allWarscrolls)}pts</h6>
        {item.units.map(o => <UnitBuilder
            key={o.id}
            unit={o}
            setUnit={setUnit}
            warscrolls={warscolls} />)}
        {item.units.length < max && <Button onClick={() => setItem({ ...item, units: [...item.units, defaultUnit()] })}>Add Unit</Button>}
    </>

}

export default RegimentItemBuilder;