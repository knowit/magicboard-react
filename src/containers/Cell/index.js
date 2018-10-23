// @flow
import styled from "react-emotion";

const Cell = styled("div")`
  background-color: rgba(0, 23, 50, 0.7);
  color: white;
  font-size: 1vw;
  padding: 8px;
  grid-area: ${props => props.area};
  grid-row: ${props => props.row};
  grid-column: ${props => props.column};
`;

export default Cell;
