import AbilityAndCommandIcon from "./AbilityAndCommandIcon";
import Phase from "./Phase";
import { EnrichedWarscroll } from "./Warscroll";

export interface Ability {
  id:                    string;
  name:                  string;
  phaseDetails:          string;
  phase:                 Phase;
  image?:                 null | string;
  altText?:               null | string;
  subsectionName?:        null | string;
  subsectionLore?:        null | string;
  subsectionRulesText?:   null | string;
  abilityGroupId?:        string;
  abilityAndCommandIcon: AbilityAndCommandIcon;
  lore:                  null | string;
  declare:               null | string;
  effect:                string;
  usedBy:                null | string;
  reaction?:             boolean;
  battleFormationId?:    string;
  castingValue?:         number | null;
  linkedWarscrollId?:    null | string;
  loreId?:               string;
  cpCost?:               number | null;
  warscrollId?:          string;
}

export interface EnrichedAbility extends Ability {
  keywords : string[]
  warscroll?: EnrichedWarscroll | null
} 

export default Ability;