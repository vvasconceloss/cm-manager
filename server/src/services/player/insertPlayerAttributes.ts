import connectToDB from "../../config/databaseConfig";
import type Attributes from "../../types/attributes";

const insertPlayerAttributes = async (idPlayer: number, attributes: Attributes) => {
  const databaseInstance = await connectToDB();

  try {
    const insertPlayerAttributeSQL = `
      INSERT INTO player_attributes (
        idPlayer, finishing, crossing, dribbling, heading, tackling, marking, passing, free_kick, 
        acceleration, agility, strength, jumping, vision, decision, positioning, antecipation, aggression, 
        reflexes, handling, diving
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    databaseInstance.prepare(insertPlayerAttributeSQL).run(
      idPlayer,
      attributes.finishing, attributes.crossing, attributes.dribbling, attributes.heading, attributes.tackling, attributes.marking, attributes.passing, attributes.free_kick,
      attributes.acceleration, attributes.agility, attributes.strength, attributes.jumping,
      attributes.vision, attributes.decision, attributes.positioning, attributes.antecipation, attributes.aggression,
      attributes.reflexes, attributes.handling, attributes.diving
    );

  } catch (error) {
    console.error(`Failure to enter player attributes: ${error}`);
    throw new Error('Failure to enter player attributes');
  }
}


export default insertPlayerAttributes;