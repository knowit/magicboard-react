// @flow

export type Props = {
  row?: string,
  column?: string,
  zoom?: number,
  accessToken: string,
  location: number[],
  maxDistance: number,
};
export type State = {
  citybikeData: any,
  enturData: any,
};

export type BBox = {
  latMin: number,
  longMin: number,
  latMax: number,
  longMax: number,
};

export type PublicTransportArrival = {
  frontText: string,
  expectedArrival: string,
  transportMode: string,
  publicCode: string,
};

export type EnturFeature = {
  type: string,
  geometry: {
    type: string,
    coordinates: [number, number],
  },
  properties: {
    name: string,
    nextPublicTransportArrival: PublicTransportArrival,
    publicTransportArrivals: PublicTransportArrival[],
  },
};

export type CitybikeFeature = {
  type: string,
  geometry: {
    type: string,
    coordinates: [number, number],
  },
  properties: {
    name: string,
    bikesAvailable: number,
    totalBikes: number,
    icon: string,
  },
};
