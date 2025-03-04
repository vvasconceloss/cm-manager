import getCountriesYouthRating from "../../utils/international/countriesYouthRating"

const generateRandomValue = (minValue: number, maxValue: number): number => { return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue }

const createPlayerPA_CA = async (nation: string) => {
  const countriesYouthRating = await getCountriesYouthRating();
  const youthRating = countriesYouthRating[nation] || 50;

  let basePotentialAbility = Math.floor(youthRating + (Math.random() * 40 - 20));
  let potentialAbility = Math.random() * 100 < youthRating / 2 
    ? generateRandomValue(160, 200) 
    : generateRandomValue(Math.max(60, basePotentialAbility -30), Math.min(200, basePotentialAbility + 30));
  
  const currentAbility = generateRandomValue(Math.floor(potentialAbility * 0.5), Math.floor(potentialAbility * 0.8));

  return { potentialAbility, currentAbility };
}

export default createPlayerPA_CA;