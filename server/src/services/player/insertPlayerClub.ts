import path from "path"
import definePriorityNation from "./insertPlayerNation";
import loadJsonDataFile from "../../utils/seed/loadJsonData";
import produceRandomPlayer from "./generatePlayerData";

const positionDistribution: Record<string, number> = {
  "GK": 3, "CB": 4, "LB": 2, "RB": 2, "CDM": 2,
  "CM": 4, "CAM": 2, "LW": 2, "RW": 2, "ST": 2
};

const insertPlayerLeague = async (nation: string, league: string) => {
  const countries = definePriorityNation();
  const leagueClubs = loadJsonDataFile(path.join(__dirname, '../', '../', 'seed', 'data', 'clubs', `${nation}`,`${league}_clubs.json`));

  try {
    for (const club of leagueClubs) {
      for (const [position, count] of Object.entries(positionDistribution)) {
        for (let counter = 0; counter < count; counter++) {
          const playerNationality = Math.random() < 0.4 ? nation : countries[Math.floor(Math.random() * countries.length)].name;
          await produceRandomPlayer(club.idClub, playerNationality, position);
        }
      }
    }
  } catch (error) {
    console.error(`Failure to insert players into clubs: ${error}`);
    throw new Error('Failure to insert players into clubs');
  }
}

export default insertPlayerLeague;