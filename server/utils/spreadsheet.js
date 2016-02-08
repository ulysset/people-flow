import GoogleSpreadsheets from 'google-spreadsheets';

/*
 * Transform coordinates
 * from R1C1 format
 */
export const transfromToR1C1Format = (value) => {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const response = [value.from, value.to].map(item => {
        const row = item.match(/\d+/)[0]; // Number
        const column = alphabet.indexOf(item.replace(/\d+/, '')) + 1; // Letter
        return `R${column}C${row}`;
    });

    return `${response[0]}:${response[1]}`;
};



/*
 * Fetch Google Spreadsheet
 */
export const fetch = ({ key, select }, callback) => {
    GoogleSpreadsheets({
        key
    }, (err, spreadsheet) => {
        spreadsheet.worksheets[0].cells({
            range: transfromToR1C1Format(select)
        }, (err, response) => {
        	callback(response.cells);
        });
    });
};



/*
 * Get cell
 */
export const getCells = (data) => {
    return data;
};
