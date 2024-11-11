import { v4 as uuidV4} from 'uuid'

export type Unit = {
    id: string
    warscrollId: string | null
    reinforced: boolean
    heroicTraitId: string | null
    artifactId: string | null
    otherEnhancements: {
        [abilityGroupId: string]: string | null;
      }
};

export const defaultUnit  = () : Unit => {
    return {
    id: uuidV4(),
    warscrollId: null,
    reinforced: false,
    heroicTraitId: null,
    artifactId: null,
    otherEnhancements: {}
}}

export default Unit;