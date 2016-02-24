/*
 * Google Spreadsheet
 */

import { SPREADSHEET_KEY } from './config';
import { fetch, getCells } from './utils/spreadsheet';

const spreadsheet = fetch({
  key: SPREADSHEET_KEY,
  select: {
    from: 'A1',
    to: 'A5'
  }
}, data => {
  const cells = getCells(data);
});



/*
 * Serve static files
 */

import express from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/../public/__build__/'));
app.listen(port, () => {
  console.log('Your server is running on http://localhost:' + port);
});
