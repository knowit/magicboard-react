// @flow
import styled from 'react-emotion';
import { fontSize } from '../../styles/theme';

export const ColContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const Grid = styled('div')`
  display: grid;
  grid-gap: 36px 10px;
  grid-template-columns: 3fr 1fr;
  grid-auto-rows: 1fr;
  padding: 36px;
  max-width: 100%;
`;

export const ItemContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: start;
  width: 100%;
`;

export const Text = styled('div')`
  font-size: ${fontSize.xsmall};
  line-height: 1;
  justify-self: end;
  align-self: center;
`;

export const IconContainer = styled('img')`
  width: 3em;
  margin-right: 12px;
  color: white;
`;

export const Header = styled('div')`
  font-size: ${fontSize.small};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 42px;
  margin-bottom: 42px;
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
  justify-content: ${props => (props.center ? 'center' : 'left')};
  align-items: center;
  background-color: ${props =>
    props.background ? props.background : 'rgba(0, 23, 50, 0.7)'};
  color: white;
  font-size: ${fontSize.xxsmall};
  padding: 8px;
  grid-area: ${props => props.area};
  grid-row: ${props => props.row};
  grid-column: ${props => props.column};
`;
