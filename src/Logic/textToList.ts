import { abilities, factions, formations, lores, warscroll_regiment_options, warscrolls } from "../Data/AllData";
import List from "../Types/ListTypes/List";
import Regiment from "../Types/ListTypes/Regiment";
import Unit, { defaultUnit } from "../Types/ListTypes/Unit";
import { v4 as uuidV4} from 'uuid'

// Constants
const ARTIFACT_PREFIX       = '• Artifact:';
const HEROIC_TRAIT_PREFIX   = '• Heroic Trait:';
const REINFORCED_PREFIX     = '• Reinforced';
const GENERAL_PREFIX        = 'General:';
const LEADER_PREFIX         = 'Leader:';
const UNIT_PREFIX         = '- ';

// Main Parsing Function
const textToList = (text: string): List => {
  const lines = text.split('\n').map(l=>l.trim());
  const list: List = {
      regiments: [], auxiliaries: [],
      id: uuidV4(),
      name: undefined,
      factionId: null,
      formationId: null,
      terrain: null,
      prayerLoreId: null,
      spellLoreId: null,
      manifestationLoreId: null,
  };

  let currentRegiment: Regiment | null = null;
  let currentUnit: Unit | null = null;
  let currentSection: 'regiment' | 'auxiliary' | null = null;

  lines.forEach(line => {
    if (parseBasicFields(line, list)) return; // Parse basic fields like name, faction, spells, etc.

    if (line.startsWith(GENERAL_PREFIX) || line.startsWith(LEADER_PREFIX)) {
      ({ currentRegiment, currentUnit, currentSection } = parseRegimentHeader(line, list));
      return;
    }

    if (line.startsWith(UNIT_PREFIX)) {
      parseWarscrollName(line, currentSection, currentRegiment, currentUnit);
      return;
    }

    if (line.startsWith('˃')) {
      parseRegimentItem(line, currentRegiment);
      currentUnit = null; // Reset unit on new regiment item
      return;
    }

    if (line.startsWith('Auxiliaries:')) {
      currentSection = 'auxiliary';
      return;
    }

    parseLeaderOrUnitProperties(line, currentSection, currentRegiment, currentUnit, list);
  });

  validateList(list); // Validate the list after parsing
  return list;
};

const splitLine = (line:string, prefix: string) => line.split(prefix)[1]?.trim()

const makeUnitFromName = (name: string) : Unit => {
    const i = warscrolls.find(o=>o.name===name);
    return  {...defaultUnit(), warscrollId:i?.id ?? ""}
  }

// Helper Function: Parsing Basic Fields (name, faction, spells, etc.)
const parseBasicFields = (line: string, list: List): boolean => {
  if (!line || !list) return false;

  if (line.startsWith('Name:')) {
    list.name = splitLine(line, 'Name:');
    return true;
  }
  if (line.startsWith('Faction:')) {
    const factionName = splitLine(line, 'Faction:');
    list.factionId = factions.find(o=>o.name === factionName)?.id ?? null;
    return true;
  }
  if (line.startsWith('Formation:')) {
    const formationName = splitLine(line, 'Formation:');
    list.formationId = formations.find(o=>o.name === formationName)?.id ?? null;
    return true;
  }
  if (line.startsWith('Spells:')) {
    const spellLoreName = splitLine(line, 'Spells:');
    list.spellLoreId = lores.find(o=>o.name === spellLoreName)?.id ?? null;
    return true;
  }
  if (line.startsWith('Prayers:')) {
    const prayerLoreName = splitLine(line, 'Prayers:');
    list.prayerLoreId = lores.find(o=>o.name === prayerLoreName)?.id ?? null
    return true;
  }
  if (line.startsWith('Manifestations:')) {
    const manifestationLoreName = splitLine(line, 'Manifestations:');
    list.manifestationLoreId = lores.find(o=>o.name === manifestationLoreName)?.id ?? null
    return true;
  }
  if (line.startsWith('Terrain:')) {
    list.terrain = makeUnitFromName(splitLine(line, 'Terrain:'))
    return true;
  }
  return false;
};

// Helper Function: Parsing Regiment Headers
const parseRegimentHeader = (line: string, list: List) => {
  const currentRegiment: Regiment = {
      isGeneral: line.startsWith(GENERAL_PREFIX),
      regimentItems: [],
      id: list.regiments.length,
      leader: defaultUnit(),
      fixedLeader: false
  };
  list.regiments.push(currentRegiment);

  return {
    currentRegiment,
    currentUnit: null,
    currentSection: 'regiment' as 'regiment'
  };
};

// Helper Function: Parsing Warscroll Name for Leader/Units
const parseWarscrollName = (line: string, currentSection: 'regiment' | 'auxiliary' | null, currentRegiment: Regiment | null, currentUnit: Unit | null) => {
  if (currentSection === 'regiment' && currentRegiment) {
    if (!currentRegiment.leader) {
      currentRegiment.leader = makeUnitFromName(splitLine(line, UNIT_PREFIX));
    } else {
      const unit: Unit = makeUnitFromName(splitLine(line, UNIT_PREFIX));
      currentRegiment.regimentItems[currentRegiment.regimentItems.length - 1].units.push(unit);
      currentUnit = unit;
    }
  }
};

// Helper Function: Parsing Regiment Items
const parseRegimentItem = (line: string, currentRegiment: Regiment | null) => {
  if (currentRegiment) {
    const description = splitLine(line, '˃').slice(0, -1);
    const option = warscroll_regiment_options.find(o=>o.warscrollId === currentRegiment.leader?.warscrollId && o.optionText === description)
    currentRegiment.regimentItems.push({ 
        units: [],
        warscrollRegimentOptionId: option?.id ?? "",
        id : uuidV4()
    });
  }
};

// Helper Function: Parsing Leader or Unit Properties (Artifact, Heroic Trait, Reinforced)
const parseLeaderOrUnitProperties = (
  line: string, 
  currentSection: 'regiment' | 'auxiliary' | null, 
  currentRegiment: Regiment | null, 
  currentUnit: Unit | null, 
  list: List
) => {
  if (line.startsWith(ARTIFACT_PREFIX)) {
    const artifactName = splitLine(line, ARTIFACT_PREFIX);
    const artifactId = abilities.find(o=>o.name===artifactName)?.id ?? null;
    if (currentSection === 'regiment' && currentRegiment) {
      if (currentRegiment.regimentItems.length >0) {
        const r = currentRegiment.regimentItems[currentRegiment.regimentItems.length-1].units
        currentRegiment.regimentItems[currentRegiment.regimentItems.length-1].units[r.length-1].artifactId = artifactId
      } else if (currentRegiment.leader) {
        currentRegiment.leader.artifactId = artifactId;
      }
    } else if (currentSection === 'auxiliary') {
      list.auxiliaries[list.auxiliaries.length - 1].artifactId =   artifactId;
    }
  } else if (line.startsWith(HEROIC_TRAIT_PREFIX)) {
    const heroicTraitName = splitLine(line, HEROIC_TRAIT_PREFIX);
    const heroicTraitId = abilities.find(o=>o.name===heroicTraitName)?.id ?? null;
    if (currentSection === 'regiment' && currentRegiment) {
      if (currentRegiment.regimentItems.length >0) {
        const r = currentRegiment.regimentItems[currentRegiment.regimentItems.length-1].units
        currentRegiment.regimentItems[currentRegiment.regimentItems.length-1].units[r.length-1].heroicTraitId = heroicTraitId;
      } else if (currentRegiment.leader) {
        currentRegiment.leader.heroicTraitId = heroicTraitId;
      }
    } else if (currentSection === 'auxiliary') {
      list.auxiliaries[list.auxiliaries.length - 1].heroicTraitId = heroicTraitId;
    }
  } else if (line.startsWith(REINFORCED_PREFIX)) {
    if (currentSection === 'regiment' && currentRegiment) {
      if (currentRegiment.regimentItems.length >0) {
        const r = currentRegiment.regimentItems[currentRegiment.regimentItems.length-1].units
        currentRegiment.regimentItems[currentRegiment.regimentItems.length-1].units[r.length-1].reinforced = true;
      } else if (currentRegiment.leader) {
        currentRegiment.leader.reinforced = true;
      }
    } else if (currentSection === 'auxiliary') {
      list.auxiliaries[list.auxiliaries.length - 1].reinforced = true;
    }
  }
};

// Validation Function: Ensures Required Fields Exist
const validateList = (list: List): boolean => {
  if (!list.name) throw new Error('List is missing a name');
  if (!list.factionId) throw new Error('List is missing a faction');
  if (list.regiments.length === 0) throw new Error('List has no regiments');
  return true;
};


export default textToList;