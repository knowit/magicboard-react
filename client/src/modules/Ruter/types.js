// @flow

export type Stop = {
  stopId: string,
  platforms: Array<string>,
  timeToThere: number,
  stopName?: string,
};

export type ParsedStops = {
  destinationName: string,
  lineName: string,
  platform: string,
  stopId: string,
  stopName: string,
  time: string,
};
