import express from 'express';
import cors from 'cors';
import { SPREADSHEET_KEY } from './config';
import { fetchSpreadsheet, getData } from './utils/spreadsheet';
import { reduceToContinents, getNetMigration } from './utils/data';

const app = express();
const port = process.env.PORT || 8000;
const router = express.Router();

app.use(cors());
app.use(express.static(__dirname + '/../public/__build__/'));
app.listen(port, () => {
  console.log('Your server is running on http://localhost:' + port);
});

let cache = null;
app.use(router.get('/data', (req, res) => {

  // Return cache
  if(cache) {
    console.log('Return cache');
    return res.status(200).json(cache);
  }

  // Initialyze promises
  const getEuropa = fetchSpreadsheet({
    key: SPREADSHEET_KEY['europa'],
    select: 'R2C1:R2449C7'
  });
  const getMaghreb = fetchSpreadsheet({
    key: SPREADSHEET_KEY['maghreb'],
    select: 'R2C1:R256C7'
  });
  const getMiddleEast = fetchSpreadsheet({
    key: SPREADSHEET_KEY['middleEast'],
    select: 'R2C1:R817C7'
  });
  const getAfrica = fetchSpreadsheet({
    key: SPREADSHEET_KEY['africa'],
    select: 'R2C1:R5695C7'
  });
  const getAmerica = fetchSpreadsheet({
    key: SPREADSHEET_KEY['america'],
    select: 'R2C1:R4951C7'
  });
  const getAsia = fetchSpreadsheet({
    key: SPREADSHEET_KEY['asia'],
    select: 'R2C1:R5458C7'
  });
  const getOceania = fetchSpreadsheet({
    key: SPREADSHEET_KEY['oceania'],
    select: 'R2C1:R1797C7'
  });

  // Fetch everything
  Promise.all(
    [getEuropa, getMaghreb, getMiddleEast,
     getAfrica, getAmerica, getAsia, getOceania]
  ).then(data => {

    console.log('All promises are resolved');

    // Get all data
    const maghrebResponse = getData(data[1]);
    const middleEastResponse = getData(data[2]);
    const europaResponse = getData(data[0]);
    const africaResponse = getData(data[3]);
    const americaResponse = getData(data[4]);
    const asiaResponse = getData(data[5]);
    const oceaniaResponse = getData(data[6]);

    // Set cache
    cache = {
      migratoryFlux: [
        europaResponse,
        { ...maghrebResponse, ...middleEastResponse }
      ],
      netMigration: [
        getNetMigration(europaResponse),
        getNetMigration({ ...maghrebResponse, ...middleEastResponse })
      ],
      reduceDataMigration: reduceToContinents({
        africa: africaResponse,
        america: americaResponse,
        asia: asiaResponse,
        oceania: oceaniaResponse,
        europa: europaResponse
      }),
      allDataMigration: {
        ...africaResponse, ...americaResponse,
        ...asiaResponse, ...europaResponse,
        ...oceaniaResponse
      }
    };

    return res.status(200).json(cache);
  })

}))
