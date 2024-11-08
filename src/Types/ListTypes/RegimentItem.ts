import Unit from "./Unit";
import { v4 as uuidV4} from 'uuid'

export type RegimentItem = {
    id:string;
    warscrollRegimentOptionId:string;
    units: Unit[];
};

export const defaultRegimentItem  = (warscrollRegimentOptionId: string) : RegimentItem => {
    return {
    id: uuidV4(),
    warscrollRegimentOptionId: warscrollRegimentOptionId,
    units:[]
}}

export default RegimentItem;