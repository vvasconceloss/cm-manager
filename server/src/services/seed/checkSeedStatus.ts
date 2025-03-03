import connectToDB from "../../config/databaseConfig"

type seedExist =  { count: number }

const checkSeedDone = async () => {
  const databaseInstance = await connectToDB();

  try {
    const checkSeedTableSQL = `SELECT COUNT(*) AS count FROM seed_status WHERE seeded = 1`;
    const seedExist = databaseInstance.prepare(checkSeedTableSQL).get() as seedExist;

    return seedExist;
  } catch (error) {
    console.error(`Failed to check seed status: ${error}`);
    throw new Error('Failed to check seed status');
  }
}

export default checkSeedDone;