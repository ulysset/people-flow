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

export const getData = data => {
  const response = {};
  const years = ['1960', '1970', '1980', '1990', '2000'];
  Object.keys(data.cells).forEach(key => {
    const countryKey = `${data.cells[key][1].value}:${data.cells[key][2].value}`;
    const country = {
      from: data.cells[key][1].value,
      to: data.cells[key][2].value,
      data: {}
    };
    Object.keys(data.cells[key]).slice(2).forEach(index => {
      const year = `${years[(index - 3)]}`;
      country.data[year] = data.cells[key][index].value;
    })
    response[countryKey] = country;
  })
  return response;
};
