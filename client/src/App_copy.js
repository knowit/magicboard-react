// @flow
import React from 'react';
import uuidv4 from 'uuid/v4';

import { Grid, Cell } from './containers';
import Ruter from './modules/Ruter';
import Sundtcommander from './modules/Sundtcommander';
import Clock from './modules/Clock';

// CSS-grids are used to defined the structure.
// To learn more about grids, tryout http://cssgridgarden.com/

export const boards = () => [
  <Grid key={uuidv4()} row="repeat(10, 1fr)" column="repeat(5, 1fr)">
    <Clock />
    <Sundtcommander />
    <Cell />
    <Cell />
    <Cell />
    <Cell />
    <Cell />
    <Ruter />
    <Cell />
  </Grid>,
  <Grid key={uuidv4()} row="repeat(10, 1fr)" column="repeat(5, 1fr)">
    <Cell />
  </Grid>,
];
