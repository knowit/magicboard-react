// @flow

import type { Weather } from "./types";
import { getWeatherSymbolId } from "./utils";

const parseYrData = (data) => {
  const weatherForecast = [];
  const weatherForecastNext = data.shortIntervals[0];

  const weatherNow: Weather = {
    start: weatherForecastNext.start,
    end: weatherForecastNext.end,
    temp: weatherForecastNext.temperature.value,
    symbol: getWeatherSymbolId(weatherForecastNext.symbol),
    precipitation: weatherForecastNext.precipitation.value
  };
  weatherForecast.push(weatherNow);

  Object.entries(data.longIntervals).forEach(([key, value]) => {
    const date = new Date(value.start);

    if(date.getHours() === 12){
      const weather: Weather = {
        start: value.start,
        end: value.end,
        temp: value.temperature.value,
        symbol: getWeatherSymbolId(value.symbol),
        precipitation: value.precipitation.value
      };
      weatherForecast.push(weather);
    }
  });

  return weatherForecast;
};


const fetchYrData = async (locationId: String) => {
  const yrData = await fetch(
    `https://www.yr.no/api/v0/locations/id/${locationId}/forecast`,
  );

  return yrData.json();
};

export const getYrData = async (locationId: String) => {
  const yrData = await fetchYrData(locationId);

  return parseYrData(yrData);
};
