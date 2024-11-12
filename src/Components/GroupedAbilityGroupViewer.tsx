import { EnrichedAbility } from "../Types/DataTypes/Ability"

export interface GroupedAbilityGroupViewerParams {
    abilityGroups: {
        abilities: EnrichedAbility[]
        name: string
    }[]
}

export const GroupedAbilityGroupViewer: React.FC<GroupedAbilityGroupViewerParams> = ({ abilityGroups }) => {
    

    return <></>
}