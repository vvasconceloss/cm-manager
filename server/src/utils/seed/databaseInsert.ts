import connectToDB from "../../config/databaseConfig"

const insertIntoDB = async (table: string, columns: string[], values: string[]) => {
  const databaseInstance = await connectToDB();

  try {
    databaseInstance.exec("BEGIN TRANSACTION");

    const columnValues = columns.map(() => "?").join(",");
    const insertDataSQL = `INSERT INTO ${table} (${columns.join(',')}) VALUES ${columnValues}`;

    databaseInstance.prepare(insertDataSQL).run(values);
    databaseInstance.exec("COMMIT");
    
  } catch (error) {
    databaseInstance.exec("ROLLBACK");
    
    console.error(`Failed to insert data into the database: ${error}`);
    throw new Error('Failed to insert data into the database');
  }
}

export default insertIntoDB;