import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const databasePath = path.resolve(__dirname, '../../../database/cm2025.db');

const ensureFolderDB = () => {
  const databaseFolder = path.dirname(databasePath);

  if (!fs.existsSync(databaseFolder))
    fs.mkdirSync(databaseFolder, { recursive: true });
}

ensureFolderDB();

const connectToDB = async () => {
  try {
    const databaseSQLite = new Database(databasePath);
    
    return databaseSQLite;
  } catch (error) {
    console.error(`Failed to connect to the database: ${error}`);
    throw new Error('Failed to connect to the database');
  }
}
export default connectToDB;