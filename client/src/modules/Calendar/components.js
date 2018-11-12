// @flow
import styled from 'react-emotion';
import { fontSize } from '../../styles/theme';

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RowContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
`;

export const Square = styled('div')`
  width: 10px;
  height: 10px;
  background-color: ${props => props.color};
  margin-right: 10px;
`;

export const Label = styled('div')`
  text-transform: uppercase;
  margin-right: 10px;
`;

export const Active = styled('div')`
  margin: 20px;
  font-size: ${fontSize.large};
`;

export const Header = styled('div')`
  font-size: ${fontSize.medium};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SubHeader = styled('div')`
  font-size: ${fontSize.small};
`;

export const CategoryBar = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  width: 100%;
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
  font-size: 1vw;
  padding: 8px;
  grid-area: ${props => props.area};
  grid-row: ${props => props.row};
  grid-column: ${props => props.column};
`;
