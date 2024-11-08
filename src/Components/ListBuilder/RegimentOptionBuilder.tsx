import { Button } from "react-bootstrap";
import useWarscrollRegimentOptions from "../../Hooks/useWarscrollRegimentOptions"
import useWarscrolls, { EnrichedWarscroll } from "../../Hooks/useWarscrolls";
import { regimentItemSum } from "../../Logic/pointSums";
import RegimentItem from "../../Types/ListTypes/RegimentItem"
import Unit, { defaultUnit } from "../../Types/ListTypes/Unit";
import UnitBuilder from "./UnitBuilder";
import useFactions from "../../Hooks/useFactions";
import { useList } from "../../Hooks/useList";

interface RegimentItemParams {
    item: RegimentItem
    setItem : (item:RegimentItem) => void;
}

const RegimentItemBuilder: React.FC<RegimentItemParams> = ({item, setItem}) => {
    const {list} = useList();
    const options = useWarscrollRegimentOptions();
    const allWarscrolls : EnrichedWarscroll[] = useWarscrolls()
    const factions = useFactions()
    const faction = factions.find(o=>o.id === list.factionId);
    const factionIds = new Set<string>(faction?.warscrolls.map(o=>o.warscrollId))
    const option = options.find(o=>o.id===item.warscrollRegimentOptionId)

    const max = option?.childQuantity !== "any" ? 1 : 1000;
    const isRequiredWarscroll = (warscroll : EnrichedWarscroll) => (option?.requiredWarscrollId && option.requiredWarscrollId === warscroll.id);
    const hasIncludedKeywords = (warscroll: EnrichedWarscroll) => !option?.requiredWarscrollId && option?.required.every(k=>warscroll.keywords.includes(k));
    const doesntHaveExcludedKeywords = (warscroll: EnrichedWarscroll) => warscroll.keywords.every(k=> !option?.excluded.includes(k));
    const filter = (warscroll: EnrichedWarscroll) => factionIds.has(warscroll.id) && !warscroll.isTerrain && !warscroll.isManifestation && (isRequiredWarscroll(warscroll) ||
        (hasIncludedKeywords(warscroll) && doesntHaveExcludedKeywords(warscroll)));

    const warscolls = allWarscrolls.filter(o=>filter(o) )

    const setUnit = (unit: Unit) : void => {
        const i = item.units.findIndex(o=>o.id===unit.id);
        const units = [...item.units]
        units[i] = unit;
        setItem({...item, units:units})
    }
    if(warscolls.length === 0 ) return <></>
    return <>
        <h6>{option?.optionText} {regimentItemSum(item, allWarscrolls)}pts</h6>
        {item.units.map(o=><UnitBuilder 
            key={o.id}
            unit={o} 
            setUnit={setUnit}
            warscrolls={warscolls} />)}
        {item.units.length < max && <Button onClick={()=>setItem({...item, units: [...item.units, defaultUnit()] })}>Add Unit</Button>}
    </>

}

export default RegimentItemBuilder;