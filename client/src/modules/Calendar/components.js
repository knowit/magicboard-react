// @flow
import styled from 'react-emotion';
import { fontSize } from '../../styles/website_theme';

export const Header = styled('div')`
  font-size: ${fontSize.small};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vh;
  height: 10vh;
  background-color: #058dc7;
  border-radius: 4px;
`;

export const Cell = styled('div')`
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: rgba(0, 23, 50, 0.7);
  color: white;
  font-size: ${fontSize.xxsmall};
  padding: 8px;
  grid-area: ${props => props.area};
  grid-row: ${props => props.row};
  grid-column: ${props => props.column};
`;
