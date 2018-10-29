// @flow

export type Props = {
  area: string,
  accessToken: string,
  location: [number, number],
  maxDistance: number,
};
export type State = {
  center: [number, number],
  citybikeData: ?{},
  enturData: ?{},
};

export type BBox = {
  latMin: number,
  longMin: number,
  latMax: number,
  longMax: number,
};
