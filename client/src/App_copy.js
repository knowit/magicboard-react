// @flow
import React from 'react';
import uuidv4 from 'uuid/v4';

import { Grid, Cell } from './containers';
import Ruter from './modules/Ruter';
import Sundtcommander from './modules/Sundtcommander';
import Clock from './modules/Clock';

const ROW_CELLS = 5;
const COLUMN_CELLS = 10;

export const boards = (viewMode?: 'landscape' | 'portrait') => {
  const row = `repeat(${
    viewMode === 'landscape' ? ROW_CELLS : COLUMN_CELLS
  }, 1fr)`;
  const column = `repeat(${
    viewMode === 'landscape' ? COLUMN_CELLS : ROW_CELLS
  }, 1fr)`;

  return [
    <Grid key={uuidv4()} row={row} column={column}>
      <Clock />
      <Sundtcommander />
      <Ruter />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </Grid>,
    <Grid key={uuidv4()} row={row} column={column}>
      <Cell />
      <Cell />
      <Ruter />
    </Grid>,
  ];
};

