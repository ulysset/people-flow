export const getNetMigration = data => {
  const response = {};

  Object.keys(data).forEach(index => {

    // Create keys
    const key = index.split(':');
    if(!response[key[0]]) {
      response[key[0]] = {
        name: key[0],
        data: {
          departures: {
            '1960': 0, '1970': 0, '1980': 0, '1990': 0, '2000': 0
          },
          arrivals: {
            '1960': 0, '1970': 0, '1980': 0, '1990': 0, '2000': 0
          }
        }
      };
    }
    if(!response[key[1]]) {
      response[key[1]] = {
        name: key[0],
        data: {
          departures: {
            '1960': 0, '1970': 0, '1980': 0, '1990': 0, '2000': 0
          },
          arrivals: {
            '1960': 0, '1970': 0, '1980': 0, '1990': 0, '2000': 0
          }
        }
      };
    }

    // Add departures and arrivals
    Object.keys(response[key[0]].data.departures).forEach(year => {
      response[key[0]].data.departures[year] += parseInt(data[index].data[year]) || 0;
    })
    Object.keys(response[key[1]].data.arrivals).forEach(year => {
      response[key[1]].data.arrivals[year] += parseInt(data[index].data[year]) || 0;
    })

  });

  return response;
}
