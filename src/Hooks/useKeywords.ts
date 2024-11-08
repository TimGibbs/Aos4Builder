import keywords from "../Data/Keywords";
import Keyword from "../Types/DataTypes/Keyword"

interface UseKeywordsReturn {

    keywords : Keyword[]
    common : {
        unique : string;
        hero : string
        prayer : string
        spell : string
        summon : string
        manifestation : string
        terrain : string
    }

}

const useKeywords = () : UseKeywordsReturn => {

    let unique : string = "";
    let hero : string = "";
    let prayer : string = "";
    let spell : string = "";
    let summon : string = ""
    let manifestation : string = "";
    let terrain : string = ""

    keywords.forEach(o=>{
        if(o.name === "Prayer") prayer = o.id
        if(o.name === "Spell") spell = o.id
        if(o.name === "Summon") summon = o.id
        if(o.name === "Manifestation") manifestation = o.id
        if(o.name === "Unique") unique = o.id
        if(o.name === "Hero") hero = o.id
        if(o.name === "Faction Terrain") terrain = o.id
        
    })

    return { keywords, common: { unique, hero, prayer, spell, summon, manifestation, terrain }}
}

export default useKeywords;