import connectToDB from "../../config/databaseConfig";

const markSeedDone = async () => {
  const databaseInstance = await connectToDB();

  try {
    const markSeedTableSQL = `INSERT INTO seed_status (seeded) VALUES (1)`;
    databaseInstance.prepare(markSeedTableSQL).run();
  } catch (error) {
    console.error(`Failed to mark seed as realised: ${error}`);
    throw new Error('Failed to mark seed as realised');
  }
}

export default markSeedDone;