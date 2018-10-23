// @flow
import React from 'react';
import Carousel from 'nuka-carousel';

import { Grid, Cell } from './containers';

const App = () => (
  <Carousel frameOverflow="hidden">
    <Grid row="repeat(10, 1fr)" column="repeat(5, 1fr)">
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </Grid>
    <Grid row="repeat(10, 1fr)" column="repeat(5, 1fr)" />
  </Carousel>
);

export default App;
