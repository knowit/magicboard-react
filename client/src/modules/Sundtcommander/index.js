// @flow
import React from 'react';
import Iframe from 'react-iframe';
import { Cell } from '../../containers';

const Sundtcommander = () => (
  <Cell row="span 10" column="span 10">
    <Iframe
      url="http://sundtcommander.knowit.no?zoom=19.6"
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
