// @flow

import type { Weather } from './types';
import { getWeatherSymbolId } from './utils';

const parseYrData = (data: any) => {
  const weatherForecast = [];
  const weatherForecastNext = data.shortIntervals[0];

  const weatherNow: Weather = {
    start: weatherForecastNext.start,
    end: weatherForecastNext.end,
    temp: weatherForecastNext.temperature.value,
    symbol: getWeatherSymbolId(weatherForecastNext.symbol),
    precipitation: weatherForecastNext.precipitation.value,
  };
  weatherForecast.push(weatherNow);

  data.longIntervals.forEach(forecast => {
    const date = new Date(forecast.start);

    if (date.getHours() === 12) {
      const weather: Weather = {
        start: forecast.start,
        end: forecast.end,
        temp: forecast.temperature.value,
        symbol: getWeatherSymbolId(forecast.symbol),
        precipitation: forecast.precipitation.value,
      };
      weatherForecast.push(weather);
    }
  });
  return weatherForecast;
};

const fetchYrData = async (locationId: string) => {
  const yrData = await fetch(
    `https://www.yr.no/api/v0/locations/id/${locationId}/forecast`,
  );

  return yrData.json();
};

export const getYrData = async (locationId: string) => {
  const yrData = await fetchYrData(locationId);

  return parseYrData(yrData);
};
