// @flow

import styled from "react-emotion";
import { fontColor, fontSize } from "../../../styles/theme";

export const StationName = styled('div')`
  font-size: ${fontSize.small};
  color: ${fontColor.secondary};
`;

export const Line = styled('div')`
  font-size: ${fontSize.xsmall};
  color: ${fontColor.secondary};
`;

export const CitybikeLayout = {
  'icon-image': `{icon}-15`,
  'text-field': '{name}\n{bikesAvailable}/{totalBikes} sykler ledig',
  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  'text-offset': [0, 0.6],
  'text-anchor': 'top',
  'text-size': 10,
  'icon-size': 1,
};

export const CitybikePaint = {
  'text-color': '#FFF',
  'text-halo-width': 1,
  'text-halo-color': '#000',
};

