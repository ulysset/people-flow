import express from 'express';
import cors from 'cors';
import { SPREADSHEET_KEY } from './config';
import { fetchSpreadsheet, getData } from './utils/spreadsheet';
import { getNetMigration } from './utils/data';

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
    return res.status(200).json(cache);
  }

  // Initialyze promises
  const getEuropa = fetchSpreadsheet({
    key: SPREADSHEET_KEY['europa'],
    select: 'R2C1:R2249C7'
  });
  const getMaghreb = fetchSpreadsheet({
    key: SPREADSHEET_KEY['maghreb'],
    select: 'R2C1:R256C7'
  });
  const getMiddleEast = fetchSpreadsheet({
    key: SPREADSHEET_KEY['middleEast'],
    select: 'R2C1:R817C7'
  });

  // Fetch everything
  Promise.all([getEuropa, getMaghreb, getMiddleEast]).then(data => {
    const europaResponse = getData(data[0]);
    const maghrebResponse = getData(data[1]);
    const middleEastResponse = getData(data[2]);

    cache = {
      insideEuropa: {
        ...europaResponse,
        ...maghrebResponse,
        ...middleEastResponse
      },
      netMigration: getNetMigration(europaResponse)
    };
    return res.status(200).json(cache);
  })

}))
