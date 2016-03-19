import express from 'express';
import cors from 'cors';
import { SPREADSHEET_KEY } from './config';
import { fetch, getData } from './utils/spreadsheet';

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
  const spreadsheet = fetch({
    key: SPREADSHEET_KEY['INSIDE_EUROPA'],
    select: 'R2C1:R2602C7'
  });

  // Fetch everything
  Promise.all([spreadsheet]).then(data => {
    const response = getData(data[0]);
    cache = response;
    return res.status(200).json({
      INSIDE_EUROPA: response
    });
  })

}))
