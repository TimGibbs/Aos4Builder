import List from "../Types/ListTypes/List";
import Regiment from "../Types/ListTypes/Regiment";
import { RegimentItem } from "../Types/ListTypes/RegimentItem";
import Unit from "../Types/ListTypes/Unit";
import Warscroll from "../Types/DataTypes/Warscroll";
import warscrolls from "../Data/Warscrolls";

const listSum = (list:List, unitWarscrolls:Warscroll[] | null) : number => {
    const scrolls = unitWarscrolls ?? warscrolls;
    return list.regiments.reduce((a,b)=>a+regimentSum(b, scrolls ?? []),0) + auxiliariesSum(list.auxiliaries, scrolls ?? []);
}
const auxiliariesSum = (auxiliaries:Unit[], unitWarscrolls:Warscroll[] | null) : number => {
    const scrolls = unitWarscrolls ?? warscrolls;
    return auxiliaries.reduce((a,b)=>a + unitsCost(b,scrolls),0);
}
const regimentSum = (regiment:Regiment, unitWarscrolls:Warscroll[] | null) : number => {
    const scrolls = unitWarscrolls ?? warscrolls;
    return unitsCost(regiment.leader,scrolls) + regiment.regimentItems.reduce((a,b)=>a+regimentItemSum(b, scrolls),0);
}

const regimentItemSum = (regimentItem:RegimentItem, unitWarscrolls:Warscroll[] | null) : number => {
    
    const scrolls = unitWarscrolls ?? warscrolls;
    return regimentItem.units.reduce((a,b)=>a+ unitsCost(b,scrolls),0);
}

const unitsCost = (unit:Unit | null, unitWarscrolls:Warscroll[] | null) : number => {
    const scrolls = unitWarscrolls ?? warscrolls;
    return (scrolls.find(x=>x.id===unit?.warscrollId)?.points ?? 0) * (unit?.reinforced ? 2 :1)}

export { listSum, auxiliariesSum, regimentSum, regimentItemSum, unitsCost };