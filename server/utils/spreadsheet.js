import GoogleSpreadsheets from 'google-spreadsheets';

/*
 * Fetch Google Spreadsheet
 */
export const fetch = ({ key, range }, callback) => {
    GoogleSpreadsheets({
        key
    }, (err, spreadsheet) => {
        spreadsheet.worksheets[0].cells({
            range
        }, (err, response) => {
        	callback(response.cells);
        });
    });
};
