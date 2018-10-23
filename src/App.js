//@flow
import React, { Component } from "react";
import Carousel from "nuka-carousel";

import { Grid, Cell } from "./containers";
import Ruter from "./modules/Ruter";
import Sundtcommander from "./modules/Sundtcommander";

class App extends Component<*> {
  render() {
    return (
      <Carousel frameOverflow="hidden">
        <Grid row="repeat(10, 1fr)" column="repeat(5, 1fr)">
          <Sundtcommander />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Cell />
          <Ruter />
          <Cell />
        </Grid>
        <Grid row="repeat(10, 1fr)" column="repeat(5, 1fr)" />
        <Grid row="repeat(10, 1fr)" column="repeat(5, 1fr)" />
        <Grid row="repeat(10, 1fr)" column="repeat(5, 1fr)" />
        <Grid row="repeat(10, 1fr)" column="repeat(5, 1fr)" />
      </Carousel>
    );
  }
}

export default App;
