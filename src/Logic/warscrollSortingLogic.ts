import { EnrichedWarscroll } from "../Hooks/useWarscrolls";

const warscrollSort = (a : EnrichedWarscroll, b: EnrichedWarscroll) => {
    if (a.isHero && !b.isHero) {
        return -1;
    }
    if (b.isHero && !a.isHero) {
        return 1;
    }
    if (a.isManifestation && !b.isManifestation) {
        return 1;
    }
    if (b.isManifestation && !a.isManifestation) {
        return -1;
    }
    if (a.isTerrain && !b.isTerrain) {
        return 1;
    }
    if (b.isTerrain && !a.isTerrain) {
        return -1;
    }
    return a.name.localeCompare(b.name);
}

export default warscrollSort;