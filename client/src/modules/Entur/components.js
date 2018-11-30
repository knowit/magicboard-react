// @flow

import styled from 'react-emotion';
import { fontFamily, fontColor, fontSize } from '../../styles/website_theme';

export const StationName = styled('div')`
  font-family: ${fontFamily.primary}
  font-size: ${fontSize.xsmall};
  color: ${fontColor.secondary};
  margin-bottom: 10px;
`;

export const Line = styled('div')`
  font-family: ${fontFamily.primary}
  font-size: ${fontSize.xxsmall};
  color: ${fontColor.secondary};
`;

export const CitybikeLayout = {
  'icon-image': `{icon}-15`,
  'text-field': '{name}\n{bikesAvailable}/{totalBikes} sykler ledig',
  'text-font': ['Raleway Regular'],
  'text-offset': [0, 0.6],
  'text-anchor': 'top',
  'text-size': 22,
  'icon-size': 1.5,
};

export const CitybikePaint = {
  'text-color': '#FFF',
  'text-halo-width': 1,
  'text-halo-color': '#000',
};
