import path from 'path';
import loadJsonDataFile from '../../utils/seed/loadJsonData';

const definePriorityNation = () => {
  const countries = loadJsonDataFile(path.join(__dirname, '../', '../', 'seed', 'data', 'international', 'countries_data.json'));
  return countries;
}

export default definePriorityNation;