export type ChildQuantity = "zeroToOne" | "any" | "one";

export interface WarscrollRegimentOption {
    id:                             string;
    childQuantity:                  ChildQuantity;
    displayOrder:                   number;
    requiredFactionKeywordId:       null | string;
    requiredRosterFactionKeywordId: null | string;
    requiredWarscrollId:            null | string;
    warscrollId:                    string;
    optionText:                     string;
}

export default WarscrollRegimentOption;