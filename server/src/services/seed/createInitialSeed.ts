import path from "path";
import markSeedDone from "./markSeedStatus";
import checkSeedDone from "./checkSeedStatus";
import insertIntoDB from "../../utils/seed/databaseInsert";
import loadJsonDataFile from "../../utils/seed/loadJsonData";

const insertStadiumsDB = async (nation: string, league: string) => {
  const stadiums = loadJsonDataFile(path.join(__dirname, '../', '../', 'seed', 'data', 'stadiums', `${nation}`,`${league}_stadiums.json`));
  await insertIntoDB('club', ["idClub", "name", "founded", "nickname", "reputation", "logo", "formation", "idStadium", "idCountry"], stadiums);
}

const insertClubsDB = async (nation: string, league: string) => {
  const clubs = loadJsonDataFile(path.join(__dirname, '../', '../', 'seed', 'data', 'clubs', `${nation}`,`${league}_clubs.json`));
  await insertIntoDB('club', ["idClub", "name", "founded", "nickname", "reputation", "logo", "formation", "idStadium", "idCountry"], clubs);
}

const insertCoachesDB = async (nation: string, league: string) => {
  const coaches = loadJsonDataFile(path.join(__dirname, '../', '../', 'seed', 'data', 'coaches', `${nation}`,`${league}_coaches.json`));
  await insertIntoDB("coach", ["idCoach", "name", "nationality", "currentClub", "isUser"], coaches);
}

const insertCompetitions = async (nation: string) => {
  const englandCompetitions = loadJsonDataFile(path.join(__dirname, 'data', 'competitions', nation, `${nation}_competitions.json`));
  await insertIntoDB("competition", ["idCompetition", "idCountry", "name", "type", "season", "logo"], englandCompetitions);
}

const seedDatabase = async () => {
  const databaseAlreadySeeded = await checkSeedDone();

  try {
    if (databaseAlreadySeeded.count === 0) {
      const countries = loadJsonDataFile(path.join(__dirname, '../', '../', 'seed', 'data', 'international', 'countries_data.json'));
      await insertIntoDB('country', ["idCountry", "name", "code", "continent", "ranking", "nationalTeam"], countries);

      //ENGLAND - PREMIER LEAGUE
      insertStadiumsDB("england", "premier_league");
      insertClubsDB("england", "premier_league");
      insertCoachesDB("england", "premier_league");
      insertCompetitions("england");

      markSeedDone();
    }
  } catch (error) {
    console.error(`Failed to populate the database: ${error}`);
    throw new Error('Failed to populate the database');
  }
}

export default seedDatabase;