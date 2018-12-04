// @flow

export type Weather = {
    start: string,
    end: string,
    temp: number,
    symbol: string,
    precipitation: number,
};

export type Props = {
    row?: string,
    column?: string,
    locationId: string,
    language: string,
};

export type State = {
    weather: ?Array<Weather>,
};
