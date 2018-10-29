// @flow

export type Weather = {
  start: string,
  end: string,
  temp: number,
  symbol: string,
  precipitation: number
};

export type Props = {
  area: string,
  locationId: string,
  language: string
};

export type State = {
  locationId: string,
  weather: ?Array<Weather>,
};
