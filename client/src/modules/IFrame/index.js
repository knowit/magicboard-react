// @flow
import React from 'react';
import Iframe from 'react-iframe';
import { Cell } from '../../containers';

type Props = {
  row?: string,
  column?: string,
  url?: string,
};

const IFrame = (props: Props) => (
  <Cell row={props.row} column={props.column}>
    <Iframe
      url={props.url}
      width="100%"
      height="100%"
      id="myId"
      display="initial"
      position="relative"
      allowFullScreen
    />
  </Cell>
);

export default IFrame;
