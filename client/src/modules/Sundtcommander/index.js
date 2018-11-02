// @flow
import React from 'react';
import Iframe from 'react-iframe';
import { Cell } from '../../containers';

const Sundtcommander = () => (
  <Cell row="span 4" column="span 4">
    <Iframe
      url="http://sundtcommander.knowit.no/"
      width="100%"
      height="100%"
      id="myId"
      display="initial"
      position="relative"
      allowFullScreen
    />
  </Cell>
);

export default Sundtcommander;
