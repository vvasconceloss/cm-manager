import { 
  Faker, faker, fakerAR, fakerCS_CZ, fakerDE, fakerDE_CH, fakerEN, fakerEN_AU, fakerEN_GB, fakerEN_IN, fakerEN_US, 
  fakerES, fakerES_MX, fakerFA, fakerFI, fakerFR, fakerHE, fakerHR, fakerHY, fakerIT, fakerJA, fakerKO, 
  fakerMK, fakerNE, fakerNL, fakerPL, fakerPT_BR, fakerPT_PT, fakerRO, fakerRU, fakerSK, fakerSR_RS_latin, 
  fakerUK, fakerVI, fakerZH_CN 
} from "@faker-js/faker";
import type Player from "../../types/player";
import { transliterate } from "transliteration";
import insertPlayerData from "./insertPlayerData";
import type Attributes from "../../types/attributes";
import createPlayerPA_CA from "./generatePlayerPA_CA";
import insertPlayerAttributes from "./insertPlayerAttributes";
import calculatePlayerAttributes from "./generatePlayerAttributes";

const fakerLocales: { [key: string]: Faker } = {
  "Argentina": fakerES, "France": fakerFR, "Spain": fakerES,
  "England": fakerEN_GB, "Brazil": fakerPT_BR, "Portugal": fakerPT_PT,
  "Netherlands": fakerNL, "Italy": fakerIT, "Germany": fakerDE,
  "Belgium": fakerNL, "Uruguay": fakerES, "Colombia": fakerES,
  "Croatia": fakerHR, "Morocco": fakerFR, "Japan": fakerJA,
  "United States": fakerEN_US, "Senegal": fakerFR, "Iran": fakerFA,
  "Mexico": fakerES_MX, "Switzerland": fakerDE_CH, "Algeria": fakerFR,
  "South Korea": fakerKO, "Poland": fakerPL, "Tunisia": fakerFR,
  "Ecuador": fakerES, "Saudi Arabia": fakerAR, "Ukraine": fakerUK,
  "Serbia": fakerSR_RS_latin, "Nigeria": fakerEN, "Australia": fakerEN_AU,
  "Romania": fakerRO, "Czech Republic": fakerCS_CZ, "Ghana": fakerEN,
  "Costa Rica": fakerES, "Cameroon": fakerFR, "Paraguay": fakerES,
  "Chile": fakerES, "Peru": fakerES, "Bosnia and Herzegovina": fakerSR_RS_latin || fakerHR,
  "Israel": fakerHE, "Slovakia": fakerSK, "North Macedonia": fakerMK, "Finland": fakerFI,
  "Iraq": fakerAR, "New Zealand": fakerEN, "Hong Kong": fakerZH_CN,
  "Bulgaria": fakerRU, "Montenegro": fakerRU, "Kuwait": fakerAR,
  "Libya": fakerAR, "Zambia": fakerEN, "Malaysia": fakerAR,
  "Congo DR": fakerFR, "Sudan": fakerAR, "Georgia": fakerSR_RS_latin,
  "Jordan": fakerAR, "Singapore": fakerAR, "Venezuela": fakerES,
  "Oman": fakerAR, "Mauritius": fakerFR, "Togo": fakerFR,
  "Mozambique": fakerPT_PT, "Syria": fakerAR, "Cote d'Ivoire": fakerFR,
  "Trinidad and Tobago": fakerEN, "El Salvador": fakerES, "Afghanistan": fakerFA,
  "Angola": fakerPT_PT, "Guatemala": fakerES, "Palestine": fakerAR,
  "Zanzibar": fakerEN, "Benin": fakerFR, "Nicaragua": fakerES,
  "Honduras": fakerES, "Guinea": fakerFR, "Armenia": fakerHY,
  "Bahrain": fakerAR, "Lebanon": fakerAR, "Tanzania": fakerEN,
  "India": fakerEN_IN, "Cuba": fakerES, "Mali": fakerFR,
  "Kyrgyzstan": fakerAR, "Eswatini": fakerEN, "Liberia": fakerEN,
  "Vietnam": fakerVI, "Seychelles": fakerFR, "Mauritania": fakerAR,
  "Zimbabwe": fakerEN, "Malawi": fakerEN, "Nepal": fakerNE,
  "Guyana": fakerEN, "Rwanda": fakerFR, "Gabon": fakerFR,
};

const getFakerByNationality = (nationality: string) => { return fakerLocales[nationality] || faker };

const capitalizeName = (name: string) => { return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()).join(' ');}

const createPlayerData = (fakerInstance: Faker) => {
  const playerFirstName = fakerInstance.person.firstName("male");
  const playerLastName = fakerInstance.person.lastName("male");

  const playerBirthDate = fakerInstance.date.birthdate({ mode: 'age', min: 16, max: 40 });

  const playerMarketValue = Math.round(parseFloat((Math.random() * 100000000).toFixed(2)));

  return { playerFirstName, playerLastName, playerMarketValue, playerBirthDate }
}

const produceRandomPlayer = async (currentClub: number, nationality: string, position: string) => {
  const fakerInstance = getFakerByNationality(nationality);
  const { playerFirstName, playerLastName, playerBirthDate, playerMarketValue } = createPlayerData(fakerInstance);

  const firstName = capitalizeName(transliterate(playerFirstName));
  const lastName = capitalizeName(transliterate(playerLastName));

  const playerBirthYear = new Date(playerBirthDate).getFullYear();

  const playerAge = new Date().getFullYear() - playerBirthYear;
  const formattedBirthDate = new Date(playerBirthDate).toISOString().split('T')[0];

  const { currentAbility, potentialAbility } = await createPlayerPA_CA(nationality);
  const playerAttributes = calculatePlayerAttributes(position, currentAbility);

  const Player: Player = {
    firstName: firstName, lastName: lastName, fullName: `${firstName} ${lastName}`,
    birthDate: formattedBirthDate, nationality: nationality, marketValue: playerMarketValue,
    currentClub: currentClub, position: position, age: playerAge, CA: currentAbility, PA: potentialAbility
  }

  const Attributes: Attributes = {
    finishing: playerAttributes.finishing, crossing: playerAttributes.crossing, dribbling: playerAttributes.dribbling,
    heading: playerAttributes.heading, tackling: playerAttributes.tackling, marking: playerAttributes.marking,
    passing: playerAttributes.passing, free_kick: playerAttributes.free_kick, acceleration: playerAttributes.acceleration,
    agility: playerAttributes.agility, strength: playerAttributes.strength, jumping: playerAttributes.jumping,
    vision: playerAttributes.vision, decision: playerAttributes.decision, positioning: playerAttributes.positioning,
    antecipation: playerAttributes.antecipation, aggression: playerAttributes.aggression, reflexes: playerAttributes.reflexes, 
    handling: playerAttributes.handling, diving: playerAttributes.diving 
  }

  const idPlayer = await insertPlayerData(Player);
  await insertPlayerAttributes(idPlayer, Attributes);
}

export default produceRandomPlayer;