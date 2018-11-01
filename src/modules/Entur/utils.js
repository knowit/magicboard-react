// @flow

import geolib from 'geolib';
import type { Props } from './types';
import bus from './img/bus_black.png';
import metro from './img/metro_black.png';
import rail from './img/rail_black.png';
import tram from './img/tram_black.png';

export function getTransportModeIcon(transportMode: string) {
  switch (transportMode) {
    case 'bus':
      return bus;
    case 'metro':
      return metro;
    case 'rail':
      return rail;
    case 'tram':
      return tram;
    default:
      return bus;
  }
}

export function generateBBox(props: Props) {
  const { location, maxDistance } = props;

  let latMin = location[0];
  let longMin = location[1];
  let latMax = location[0];
  let longMax = location[1];

  while (
    geolib.getDistance(
      { latitude: location[0], longitude: location[1] },
      { latitude: latMin, longitude: location[1] },
    ) < maxDistance
  ) {
    latMin -= 0.0001;
  }

  while (
    geolib.getDistance(
      { latitude: location[0], longitude: location[1] },
      { latitude: location[0], longitude: longMin },
    ) < maxDistance
  ) {
    longMin -= 0.0001;
  }

  while (
    geolib.getDistance(
      { latitude: location[0], longitude: location[1] },
      { latitude: latMax, longitude: location[1] },
    ) < maxDistance
  ) {
    latMax += 0.0001;
  }

  while (
    geolib.getDistance(
      { latitude: location[0], longitude: location[1] },
      { latitude: location[0], longitude: longMax },
    ) < maxDistance
  ) {
    longMax += 0.0001;
  }

  return {
    center: [location[1], location[0]],
    latMin,
    longMin,
    latMax,
    longMax,
  };
}
