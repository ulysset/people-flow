export const getNetMigration = data => {
  const response = {};

  Object.keys(data).forEach(index => {

    // Create keys
    const key = index.split(':');
    if(!response[key[0]]) {
      response[key[0]] = {
        name: key[0],
        data: {
          departures: { '1960': 0, '1970': 0, '1980': 0, '1990': 0, '2000': 0 },
          arrivals: { '1960': 0, '1970': 0, '1980': 0, '1990': 0, '2000': 0 }
        }
      };
    }
    if(!response[key[1]]) {
      response[key[1]] = {
        name: key[0],
        data: {
          departures: { '1960': 0, '1970': 0, '1980': 0, '1990': 0, '2000': 0 },
          arrivals: { '1960': 0, '1970': 0, '1980': 0, '1990': 0, '2000': 0 }
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

export const reduceToContinents = data => {

  // Init countries
  const countriesKey = [
    'ALB', 'AND', 'AUT', 'BLR', 'BEL', 'BIH',
    'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST',
    'FRO', 'FIN', 'FRA', 'GEO', 'DEU', 'GIB',
    'GRC', 'GRL', 'HUN', 'ISL', 'IRL', 'ITA',
    'LVA', 'LIE', 'LTU', 'LUX', 'MKD', 'MDA',
    'MCO', 'MNE', 'NLD', 'NOR', 'POL', 'PRT',
    'ROM', 'RUS', 'SMR', 'SRB', 'SCG', 'SVK',
    'SVN', 'ESP', 'SWE', 'CHE', 'UKR', 'GBR'
  ];
  const response = {};
  countriesKey.forEach(countryKey => {
    response[countryKey] = {
      name: countryKey,
      data: {}
    };
  });

  // Init countries data object
  Object.keys(response).forEach(country => {
    ['africa', 'america', 'oceania', 'asia', 'europa'].forEach(continentKey => {
      response[country].data[continentKey] = {
        '1960': {
          departures: 0,
          arrivals: 0
        },
        '1970': {
          departures: 0,
          arrivals: 0
        },
        '1980': {
          departures: 0,
          arrivals: 0
        },
        '1990': {
          departures: 0,
          arrivals: 0
        },
        '2000': {
          departures: 0,
          arrivals: 0
        }
      }
    });
  })

  // Add data
  Object.keys(data).forEach(continentKey => {
    const item = data[continentKey];
    Object.keys(item).forEach(keys => {
      keys.split(':').forEach((key, index) => {
        if(countriesKey.includes(key)) {
          if(index == 0) {
            Object.keys(item[keys].data).forEach(year => {
              response[key].data[continentKey][year].departures += parseInt(data[continentKey][keys].data[year]) || 0;
            })
          }
          else {
            Object.keys(item[keys].data).forEach(year => {
              response[key].data[continentKey][year].arrivals += parseInt(data[continentKey][keys].data[year]) || 0;
            })
          }
        }
      });
    })
  });

  return response;
}
