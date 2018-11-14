// @flow
import React from 'react';
import uuidv4 from 'uuid/v4';

import { Grid, Cell } from './containers';
import Ruter from './modules/Ruter';
import Clock from './modules/Clock';

const ROW_CELLS = 5;
const COLUMN_CELLS = 10;

export const boards = () => [
  <Grid key={uuidv4()} row={ROW_CELLS} column={COLUMN_CELLS}>
    <Clock />
    <Cell />
    <Cell />
    <Cell />
    <Cell />
  </Grid>,
  <Grid key={uuidv4()} row={ROW_CELLS} column={COLUMN_CELLS}>
    <Cell />
    <Cell />
    <Ruter />
  </Grid>,
];
