export interface Publication {
    id:                 string;
    name:               string;
    spearheadName:      null | string;
    productId:          null | string;
    displayOrder:       number | null;
    factionKeywordId:   null | string;
}

export default Publication;