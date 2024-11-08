import { useMemo } from "react";
import WarscrollRegimentOption from "../Types/DataTypes/WarscrollRegimentOptions";
import warscroll_regiment_option_excluded_keywords from "../Data/WarscrollRegimentOptionExcludedKeyword";
import warscroll_regiment_option_required_keywords from "../Data/WarscrollRegimentOptionRequiredKeyword";
import warscroll_regiment_options from "../Data/WarscrollRegimentOptions";

export interface EnrichedWarscrollRegimentOptions extends WarscrollRegimentOption {
    required : string[]
    excluded : string[]
}

export const useWarscrollRegimentOptions = () => {
    
    const memo = useMemo(()=>warscroll_regiment_options.map(o=>enrich(o)),[])
    return memo;
}

const enrich = (regimentOption : WarscrollRegimentOption) : EnrichedWarscrollRegimentOptions => {

    const excluded = warscroll_regiment_option_excluded_keywords.filter(o=>o.warscrollRegimentOptionId === regimentOption.id).map(o=>o.keywordId);
    const required = warscroll_regiment_option_required_keywords.filter(o=>o.warscrollRegimentOptionId === regimentOption.id).map(o=>o.keywordId);
    return {...regimentOption, excluded, required}
}

export default useWarscrollRegimentOptions;