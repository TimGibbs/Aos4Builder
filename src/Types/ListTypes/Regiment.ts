import RegimentItem from "./RegimentItem";
import Unit, { defaultUnit } from "./Unit";

type Regiment = {
    id: number
    isGeneral: boolean
    leader: Unit
    regimentItems: RegimentItem[]
    fixedLeader: boolean
};

export const defaultRegiment = (id:number) => ({
    id:id,
    isGeneral: false,
    leader: defaultUnit(),
    regimentItems: [],
    fixedLeader: false
})

export default Regiment;