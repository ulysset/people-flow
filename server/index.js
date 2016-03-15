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

app.use(router.get('/data', (req, res) => {
  const spreadsheet = fetch({
    key: SPREADSHEET_KEY,
    select: 'R2C1:R2602C7'
  }, data => {
    const response = getData(data);
    res.status(200).json(response);
  });
}))
