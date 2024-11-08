import Regiment from "./Regiment"
import Unit, { defaultUnit } from "./Unit"
import { v4 as uuidV4} from 'uuid'

type List = {
    id: string
    name: string | undefined
    factionId : string | null
    formationId: string | null
    regiments: Regiment[]
    auxiliaries: Unit[]
    terrain: Unit | null
    prayerLoreId: string | null
    spellLoreId: string | null
    manifestationLoreId: string | null
}

const generalsRegiment : Regiment = {
    id:0,
    isGeneral: true,
    leader: defaultUnit(),
    regimentItems: [],
    fixedLeader: false,
}

 export const defaultList = () : List  => {
    return {
    id: uuidV4(),
    name: undefined,
    factionId: null,
    formationId: null,
    regiments: [generalsRegiment],
    auxiliaries: [],
    terrain: null,
    prayerLoreId: null,
    spellLoreId: null,
    manifestationLoreId: null
  }}

export default List

