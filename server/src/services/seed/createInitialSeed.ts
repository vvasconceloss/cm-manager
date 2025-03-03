import path from "path";
import markSeedDone from "./markSeedStatus";
import checkSeedDone from "./checkSeedStatus";
import insertIntoDB from "../../utils/seed/databaseInsert";
import loadJsonDataFile from "../../utils/seed/loadJsonData";

const seedDatabase = async () => {
  const databaseAlreadySeeded = await checkSeedDone();

  try {
    if (databaseAlreadySeeded.count === 0) {
      const countries = loadJsonDataFile(path.join(__dirname, '../', '../', 'seed', 'data', 'international', 'countries_data.json'));
      await insertIntoDB('country', ["idCountry", "name", "code", "continent", "ranking", "nationalTeam"], countries);

      markSeedDone();
    }
  } catch (error) {
    console.error(`Failed to populate the database: ${error}`);
    throw new Error('Failed to populate the database');
  }
}

export default seedDatabase;