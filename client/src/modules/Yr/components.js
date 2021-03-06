// @flow

import styled from 'react-emotion';
import { fontColor, fontSize } from '../../styles/theme';

export const TempNow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.large};
  font-color: ${fontColor.primary};
`;

export const DescriptionNow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.xsmall};
  font-color: ${fontColor.primary};
`;

export const Forecast = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.xsmall};
  font-color: ${fontColor.primary};
`;
