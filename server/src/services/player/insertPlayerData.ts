import type Player from "../../types/player";
import connectToDB from "../../config/databaseConfig";

const insertPlayerData = async (player: Player) => {
  const databaseInstance = await connectToDB();

  try {
    databaseInstance.exec("BEGIN TRANSACTION");

    const insertPlayerSQL = `INSERT INTO player (first_name, last_name, full_name, birthDate, nationality, marketValue, currentClub, position, age, CA, PA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const insertPlayerResult = databaseInstance.prepare(insertPlayerSQL).run(
      player.firstName, player.lastName, player.fullName, 
      player.birthDate, player.nationality, player.marketValue, 
      player.currentClub, player.position, player.age, player.CA, player.PA
    );

    databaseInstance.exec("COMMIT");

    return insertPlayerResult.lastInsertRowid as number;
  } catch (error) {
    databaseInstance.exec("ROLLBACK");

    console.error(`Failed to add the player to the database: ${error}`);
    throw new Error('Failed to add the player to the database');
  }
}

export default insertPlayerData;