import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import type Club from '../../types/club';
import connectToDB from '../../config/databaseConfig';

const insertLogoImages = async (nation: string, graphicsFolderPath: string) => {
  const databaseInstance = await connectToDB();

  try {
    databaseInstance.exec("BEGIN TRANSACTION");

    const defaultLogoPath = path.join(__dirname, '../', '../', 'assets', 'default_logo.png');
    const logosFolderPath = path.join(graphicsFolderPath, "logos", nation.toLocaleLowerCase());
    if (!fs.existsSync(logosFolderPath)) { fs.mkdirSync(logosFolderPath, { recursive: true }); }

    const clubs = databaseInstance.prepare(`SELECT club.idClub, logo FROM club INNER JOIN country ON country.idCountry = club.idCountry WHERE country.idCountry = 4`).all() as Club[];

    for (const club of clubs) {
      const logoFilePath = path.join(logosFolderPath, `${club.idClub}.png`);

      if (fs.existsSync(logoFilePath)) {
        const updateLogoPathSQL = `UPDATE club SET logo = '${logoFilePath}' WHERE idClub = ${club.idClub}`;
        databaseInstance.prepare(updateLogoPathSQL).run();
      } else {
        const updateLogoPathSQL = `UPDATE club SET logo = '${defaultLogoPath}' WHERE idClub = ${club.idClub}`;
        databaseInstance.prepare(updateLogoPathSQL).run();
      }
    }

    databaseInstance.exec("COMMIT");
  } catch (error) {
    databaseInstance.exec("ROLLBACK");

    console.error(`Failed to insert images into the database: ${error}`);
    throw new Error('Failed to insert images into the database');
  }
}

const getGraphicsFolder = () => {
  const graphicsFolderPath = path.join(os.homedir(), 'Documents', 'ProPlay Studios', "Championship Manager 2025", "graphics");
  if (!fs.existsSync(graphicsFolderPath)) { fs.mkdirSync(graphicsFolderPath, { recursive: true }); }

  return graphicsFolderPath;
}

export { getGraphicsFolder, insertLogoImages }