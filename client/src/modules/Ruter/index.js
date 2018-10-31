// @flow
import React from 'react';
import uuidv4 from 'uuid/v4';
import { Grid, Cell } from '../../containers';
import { generateAllStops } from './services';
import type { Stop, ParsedStops } from './types';

const stopItem: Stop = {
  stopId: '3010531',
  platforms: ['2', '5', '6', '11'],
  timeToThere: 5,
};

type State = {
  stops: ?Array<ParsedStops>,
};

class Ruter extends React.Component<{}, State> {
  constructor() {
    super();
    this.state = {
      stops: undefined,
    };
  }

  async componentDidMount() {
    const response = await generateAllStops(stopItem);
    this.setState({ stops: response });
  }

  render() {
    return (
      <Cell row="span 4" column="span 2">
        {this.state.stops ? (
          <Grid nested row="repeat(12, 1fr)" column="1fr 4fr 1.5fr 2fr">
            <OverridedCell>Line</OverridedCell>
            <OverridedCell>Destination</OverridedCell>
            <OverridedCell>Platform</OverridedCell>
            <OverridedCell>Time</OverridedCell>
            {this.state.stops.map(stop => [
              <OverridedCell key={uuidv4()}>{stop.lineName}</OverridedCell>,
              <OverridedCell key={uuidv4()}>
                {stop.destinationName}
              </OverridedCell>,
              <OverridedCell
                key={uuidv4()}
                style={{
                  padding: 0,
                  margin: 0,
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                }}>
                {stop.platform}
              </OverridedCell>,
              <OverridedCell key={uuidv4()}>{stop.time}</OverridedCell>,
            ])}
          </Grid>
        ) : (
          <div>Loading...</div>
        )}
      </Cell>
    );
  }
}

const OverridedCell = props => (
  <Cell {...props} style={{ padding: 0, backgroundColor: 'transparent' }} />
);

export default Ruter;
