// @flow
import React from 'react';
import styled from 'react-emotion';

type Props = {
  column: string,
  row: string,
  nested: ?boolean,
};

const StyledGrid = styled('div')`
  display: grid;
  grid-template-rows: ${props => props.row};
  grid-template-columns: ${props => props.column};
  grid-gap: 8px;
  overflow: hidden;
  width: ${props => (props.nested ? '100%' : '100vw')};
  height: ${props => (props.nested ? '100%' : '100vh')};
`;

const Grid = (props: Props) => <StyledGrid {...props} />;

export default Grid;
