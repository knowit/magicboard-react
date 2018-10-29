// @flow

import geolib from 'geolib';
import type { Props } from './types';

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
