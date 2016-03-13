import GoogleSpreadsheets from 'google-spreadsheets';

type QueryType = {
  from: string,
  to: string
};



/*
 * Transform coordinates
 * from R1C1 format
 */
export const transfromToR1C1Format = (value: QueryType): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const response = [value.from, value.to].map(item => {
    const row = item.match(/\d+/)[0]; // Number
    const column = alphabet.indexOf(item.replace(/\d+/, '')) + 2; // Letter
    return `R${column}C${row}`;
  });
  return `${response[0]}:${response[1]}`;
};



/*
 * Fetch spreadsheet
 */
export const fetch = (options: { key: string, select: QueryType }, callback: any) => (
  GoogleSpreadsheets({
    key: options.key
  }, (err, spreadsheet) => {
  spreadsheet.worksheets[0].cells({
      range: transfromToR1C1Format(options.select)
    }, (err, response) => {
    	callback(response);
    });
  })
);



/*
 * Get cell
 */
export const getCells = (data) => {
  return data.cells;
};
