// @flow
import React from 'react';
import styled from 'react-emotion';

type Props = {
    column: string,
    row: string,
    nested?: boolean,
    horizontal?: boolean,
};

// Should ideally be replaced by something that gets the remaining height of the screen
const getHeight = (props: Props) => {
    if(props.nested){
        return '100%';
    }
    if(props.horizontal){
        return '81vh';
    }
    return '89vh';
};

const StyledGrid = styled('div')`
  display: grid;
  grid-template-rows: ${props => props.row};
  grid-template-columns: ${props => props.column};
  grid-gap: 8px;
  overflow: hidden;
  grid-auto-flow: ${props => (props.horizontal ? 'column' : 'row')};
  width: ${props => (props.nested ? '100%' : 'auto')};
  height: ${props => getHeight(props)};
`;

const Grid = (props: Props) => <StyledGrid {...props} />;

export default Grid;
