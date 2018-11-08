// @flow
import styled from 'react-emotion';
import { fontFamily, fontSize } from '../../styles/theme';

export const Header = styled('div')`
  font-family: ${fontFamily.primary}
  font-size: ${fontSize.medium};
  display: flex;
  justify-content: center;
`;

export const Line = styled('div')`
  font-family: ${fontFamily.primary}
  font-size: ${fontSize.small};
`;

export const LineBold = styled(Line)`
  font-weight: bold;
`;
