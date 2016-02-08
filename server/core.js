import { SPREADSHEET_KEY } from './config';
import { fetch, getCells } from './utils/spreadsheet';

export const run = () => {

    const spreadsheet = fetch({
        key: SPREADSHEET_KEY,
        select: {
            from: 'A1',
            to: 'A5'
        }
    }, data => {

        const cell = getCells(data);

    });

};
