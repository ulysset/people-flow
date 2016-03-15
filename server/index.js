/*
 * Google Spreadsheet
 */

import { SPREADSHEET_KEY } from './config';
import { fetch, getCells } from './utils/spreadsheet';




/*
 * Serve static files
 */

import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;
const router = express.Router();

app.use(cors());

app.use(express.static(__dirname + '/../public/__build__/'));

app.listen(port, () => {
  console.log('Your server is running on http://localhost:' + port);
});

app.use(router.get('/data', (req, res) => {
  const spreadsheet = fetch({
    key: SPREADSHEET_KEY,
    select: 'R2C1:R1240C10'
  }, data => {
    const cells = getCells(data);
    let response = [];
    const years = ['1970', '1980', '1990', '2000', '2010'];
    Object.keys(cells).forEach(key => {
      const countryKey = `${cells[key][1].value}:${cells[key][2].value}`;
      const country = {
        from: cells[key][1].value,
        to: cells[key][2].value,
        data: {}
      };
      Object.keys(cells[key]).slice(2).forEach(index => {
        const year = `${years[(index - 3)]}`;
        country.data[year] = cells[key][index].value;
      })
      response.push(country);
    })
    res.status(200).json(response);
  });
}))
