// @flow
import React from 'react';

import { Grid } from './containers';
import Clock from './modules/Clock';

const ROW_CELLS = 'repeat(16, 1fr)';
const COLUMN_CELLS = 'repeat(10, 1fr)';

export const boards = () => [
  <Grid key={0} row={ROW_CELLS} column={COLUMN_CELLS}>
    <Clock />
  </Grid>,
  <Grid key={1} row={ROW_CELLS} column={COLUMN_CELLS}>
    <Clock />
  </Grid>,
  <Grid key={2} row={ROW_CELLS} column={COLUMN_CELLS}>
    <Clock />
  </Grid>,
];
