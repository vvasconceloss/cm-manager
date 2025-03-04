import connectToDB from "../../config/databaseConfig";

let youthRating: Record<string, number> = {};
type countryData = { idCountry: number, name: string, youth_rating: number}

const getCountriesYouthRating = async () => {
  const databaseInstance = await connectToDB();

  try {
    databaseInstance.exec("BEGIN TRANSACTION");

    const selectCountryDataSQL = `SELECT idCountry, name, youth_rating FROM country`;
    const countriesData = databaseInstance.prepare(selectCountryDataSQL).all() as countryData[];

    for (const country of countriesData) {
      youthRating[country.name] = country.youth_rating
    }

    databaseInstance.exec("COMMIT");
    
    return youthRating;
  } catch (error) {
    databaseInstance.exec("ROLLBACK");

    console.error(`Failure to obtain country youth ratings: ${error}`);
    throw new Error('Failure to obtain country youth ratings');
  }
}

export default getCountriesYouthRating;