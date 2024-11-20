import { useMemo } from "react";
import WarscrollRegimentOption from "../Types/DataTypes/WarscrollRegimentOptions";
import warscroll_regiment_options from "../Data/WarscrollRegimentOptions";
import { WarscrollKeywordRequirement } from "../Types/DataTypes/WarscrollKeywordRequirement";
import warscroll_regiment_option_excluded_keywords from "../Data/WarscrollRegimentOptionExcludedKeyword";
import warscroll_regiment_option_required_keywords from "../Data/WarscrollRegimentOptionRequiredKeyword";

export interface EnrichedWarscrollRegimentOptions extends WarscrollRegimentOption {
    required : string[]
    excluded : string[]
}

export const useWarscrollRegimentOptions = () => {
    
    const memo = useMemo(()=>warscroll_regiment_options.map(o=>enrichWarscrollRegiment(o, warscroll_regiment_option_excluded_keywords, warscroll_regiment_option_required_keywords)),[])
    return memo;
}

const enrichWarscrollRegiment = (regimentOption : WarscrollRegimentOption, warscroll_regiment_option_excluded_keywords: WarscrollKeywordRequirement[], warscroll_regiment_option_required_keywords: WarscrollKeywordRequirement[] ) : EnrichedWarscrollRegimentOptions => {

    const excluded = warscroll_regiment_option_excluded_keywords.filter(o=>o.warscrollRegimentOptionId === regimentOption.id).map(o=>o.keywordId);
    const required = warscroll_regiment_option_required_keywords.filter(o=>o.warscrollRegimentOptionId === regimentOption.id).map(o=>o.keywordId);
    return {...regimentOption, excluded, required}
}

export default useWarscrollRegimentOptions;