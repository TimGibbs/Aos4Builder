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
        unlimited : string
        ward3 : string
        ward4 : string
        ward5 : string
        ward6 : string
    }
    dictionary : Record<string,string>

}

const useKeywords = () : UseKeywordsReturn => {

    let unique : string = "";
    let hero : string = "";
    let prayer : string = "";
    let spell : string = "";
    let summon : string = ""
    let manifestation : string = "";
    let terrain : string = ""
    let unlimited : string = ""
    let ward3 : string = ""
    let ward4 : string = ""
    let ward5 : string = ""
    let ward6 : string = ""

    const dictionary : Record<string, string> = {};
    keywords.forEach(o=>{
        if(o.name === "Prayer") prayer = o.id
        if(o.name === "Spell") spell = o.id
        if(o.name === "Summon") summon = o.id
        if(o.name === "Manifestation") manifestation = o.id
        if(o.name === "Unique") unique = o.id
        if(o.name === "Hero") hero = o.id
        if(o.name === "Faction Terrain") terrain = o.id
        if(o.name === "Unlimited") unlimited = o.id
        if(o.name === "Ward (3+)") ward3 = o.id
        if(o.name === "Ward (4+)") ward4 = o.id
        if(o.name === "Ward (5+)") ward5 = o.id
        if(o.name === "Ward (6+)") ward6 = o.id
        dictionary[o.id] = o.name;
    })
    
    return { keywords, common: { unique, hero, prayer, spell, summon, manifestation, terrain, unlimited, ward3, ward4, ward5, ward6 }, dictionary}
}

export default useKeywords;