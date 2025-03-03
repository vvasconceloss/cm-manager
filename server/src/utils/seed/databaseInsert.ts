import connectToDB from "../../config/databaseConfig"

interface tableValues { [column: string]: object | string }

const insertIntoDB = async (table: string, columns: string[], values: tableValues[]) => {
  const databaseInstance = await connectToDB();

  try {
    databaseInstance.exec("BEGIN TRANSACTION");

    const columnValues = columns.map(() => "?").join(",");
    const insertDataSQL = `INSERT INTO ${table} (${columns.join(',')}) VALUES (${columnValues})`;

    for (const value of values) {
      const valuesArray = columns.map((column) => value[column]);
      databaseInstance.prepare(insertDataSQL).run(...valuesArray);
    }

    databaseInstance.exec("COMMIT");
    
  } catch (error) {
    databaseInstance.exec("ROLLBACK");
    
    console.error(`Failed to insert data into the database: ${error}`);
    throw new Error('Failed to insert data into the database');
  }
}

export default insertIntoDB;