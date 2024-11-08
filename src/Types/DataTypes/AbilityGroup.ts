export interface AbilityGroup {
    id:                                  string;
    name:                                string;
    restrictionText:                     null | string;
    abilityGroupType:                    AbilityGroupType | null;
    subsectionName:                      null | string;
    subsectionLore:                      null | string;
    subsectionRulesText:                 null | string;
    image:                               null | string;
    altText:                             null | string;
    regimentOfRenownPointsCost:          number | null;
    factionId:                           null | string;
    publicationId:                       string;
    rosterLevelLimit:                    number | null;
    unitLevelLimit:                      number | null;
}

export type AbilityGroupType = "heroicTraits" | "artefactsOfPower" | "battleTraits" | "spearheadEnhancements" | "regimentOfRenown" | "regimentAbilities" | "otherEnhancements";

export default AbilityGroup;