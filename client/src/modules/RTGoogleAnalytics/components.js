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
  margin-top: 50px;
  margin-bottom: 100px;
  font-size: ${fontSize.large};
`;

export const Header = styled('div')`
  font-size: ${fontSize.small};
`;

export const SubHeader = styled('div')`
  margin-bottom: 50px;
  font-size: ${fontSize.xsmall};
`;

export const CategoryBar = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
  width: 100%;
`;

export const Mobile = styled('div')`
  text-align: center;
  width: ${props => props.value}%;
  background-color: #50b432;
  margin-right: 2px;
`;

export const Desktop = styled('div')`
  text-align: center;
  width: ${props => props.value}%;
  background-color: #ed561b;
  margin-right: 2px;
`;

export const Tablet = styled('div')`
  text-align: center;
  width: ${props => props.value}%;
  background-color: #058dc7;
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
