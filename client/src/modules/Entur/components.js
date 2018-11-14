// @flow

import styled from 'react-emotion';
import { fontFamily, fontColor, fontSize } from '../../styles/theme';

export const StationName = styled('div')`
  font-family: ${fontFamily.primary}
  font-size: ${fontSize.medium};
  color: ${fontColor.secondary};
`;

export const Line = styled('div')`
  font-family: ${fontFamily.primary}
  font-size: ${fontSize.small};
  color: ${fontColor.secondary};
`;

export const CitybikeLayout = {
  'icon-image': `{icon}-15`,
  'text-field': '{name}\n{bikesAvailable}/{totalBikes} sykler ledig',
  'text-font': ['Raleway Regular'],
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
