import GoogleSpreadsheets from 'google-spreadsheets';

export const fetch = (options: { key: string, select: string }, callback: any) => (
  GoogleSpreadsheets({
    key: options.key
  }, (err, spreadsheet) => {
  spreadsheet.worksheets[0].cells({
      range: options.select
    }, (err, response) => {
    	callback(response);
    });
  })
);

export const getCells = (data) => {
  return data.cells;
};
