// @flow

import type { Weather } from './types';

export const getWeatherDescription = (weather: Weather) => {
  if (weather.precipitation === 0) {
    return 'Opphold neste time';
  }
  if (weather.precipitation <= 2) {
    return 'Lett nedbør neste time';
  }
  return 'Nedbør neste time';
};

export const getWeatherSymbolId = (symbol: any) => {
  if (!symbol) return '';
  let id = symbol.n;
  if (id[0] === '0') {
    id.substr(1, id.length);
  }
  switch (symbol.var) {
    case 'Sun':
      id += 'd';
      break;
    case 'PolarNight':
      id += 'm';
      break;
    case 'Moon':
      id += 'n';
      break;
    default:
  }
  return id;
};
