/*
 * Google Spreadsheet
 */

import { SPREADSHEET_KEY } from './config';
import { fetch, getCells } from './utils/spreadsheet';

const spreadsheet = fetch({
  key: SPREADSHEET_KEY,
  select: 'R2C1:R3C10'
}, data => {
  const cells = getCells(data);
  let response = [];
  Object.keys(cells).forEach(key => {
    Object.keys(cells[key]).forEach(index => {
      const country = cells[key][index];
    })
  })
  console.log(response);
});



/*
 * Serve static files
 */

import express from 'express';

const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();

app.use(express.static(__dirname + '/../public/__build__/'));

app.listen(port, () => {
  console.log('Your server is running on http://localhost:' + port);
});

app.use(router.get('/data', function (req, res) {
  res.status(200).json({name:'yolo'});
}))
