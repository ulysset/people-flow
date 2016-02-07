import { SPREADSHEET_KEY } from './config';
import { fetch } from './utils/spreadsheet';

export const run = () => {

    const spreadsheet = fetch({
        key: SPREADSHEET_KEY,
        range: 'R1C1:R2C6'
    }, (data) => {
        console.log(data);
    });

};
