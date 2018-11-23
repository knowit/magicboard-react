// @flow
import React from 'react';

import { Grid } from './containers';
import Clock from './modules/Clock';

const ROW_CELLS = 16;
const COLUMN_CELLS = 10;

export const boards = () => [
  <Grid key={0} row={`repeat(${ROW_CELLS}, 1fr)`} column={`repeat(${COLUMN_CELLS}, 1fr)`}>
    <Clock />
  </Grid>,
  <Grid key={1} row={`repeat(${ROW_CELLS}, 1fr)`} column={`repeat(${COLUMN_CELLS}, 1fr)`}>
    <Clock />
  </Grid>,
  <Grid key={2} row={`repeat(${ROW_CELLS}, 1fr)`} column={`repeat(${COLUMN_CELLS}, 1fr)`}>
    <Clock />
  </Grid>,
];
