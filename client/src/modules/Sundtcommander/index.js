// @flow
import React from 'react';
import Iframe from 'react-iframe';
import { Cell } from '../../containers';

type Props = {
  row?: string,
  column?: string,
  zoom?: number,
};

const Sundtcommander = (props: Props) => {
  const urlString = 'http://sundtcommander.knowit.no?zoom='.concat(
    String(props.zoom),
  );


  if(props.zoom) {
    const urlString = `http://sundtcommander.knowit.no?zoom=${props.zoom}`;

    return (<Cell row={props.row} column={props.column}>
      <Iframe
        url={urlString}
        width="100%"
        height="100%"
        id="myId"
        display="initial"
        position="relative"
        allowFullScreen
      />

    </Cell>)
  }
  return null;
};

Sundtcommander.defaultProps = {
  row: "span 10",
  column: "span 10",
  zoom: 19.6,
};

export default Sundtcommander;
