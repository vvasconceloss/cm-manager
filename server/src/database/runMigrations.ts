import fs from "fs";
import path from "path";
import connectToDB from "../config/databaseConfig";

const executeMigrations = async () => {
  try {
    const databaseInstance = await connectToDB();

    const createMigrationTableSQL = `CREATE TABLE IF NOT EXISTS "migrations" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "name" TEXT UNIQUE NOT NULL, "applied_at" INTEGER NOT NULL);`;
    databaseInstance.exec(createMigrationTableSQL);

    const migrationsFolder = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsFolder).sort();

    for (const file of migrationFiles) {
      const migrationFilePath = path.join(migrationsFolder, file);
      
      const verifyExistMigrationSQL = `SELECT * FROM migrations WHERE name = ?`;
      const existMigration = databaseInstance.prepare(verifyExistMigrationSQL).all(file);
      
      const migration = fs.readFileSync(migrationFilePath, 'utf-8');

      if (existMigration.length === 0) {
        databaseInstance.exec(migration)

        const insertMigrationInfoSQL = `INSERT INTO migrations (name, applied_at) VALUES (?, ?)`;        
        databaseInstance.prepare(insertMigrationInfoSQL).run(file, Date.now());

        console.log(`The migration ${file} was successfully executed`);
      }
    }

  } catch (error) {
    console.error(`Failed to execute migrations: ${error}`);
    throw new Error('Failed to execute migrations');
  }
}

executeMigrations();