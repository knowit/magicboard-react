// @flow
import React, { Component } from 'react';
import styled from 'react-emotion';
import uuidv4 from 'uuid/v4';
import { getYrData } from './services';
import Grid from '../../containers/Grid';
import type { Props, State } from './types';
import { getWeatherDescription } from './utils';
import { images } from './images';
import { fontColor, fontSize } from '../../styles/theme';
import Cell from '../../containers/Cell';

class Yr extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      weather: undefined,
    };
  }

  async componentDidMount() {
    const response = await getYrData(this.props.locationId);
    this.setState({ weather: response });
    this.intervalId = setInterval(this.tick, 1000 * 60 * 10);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  tick = async () => {
    const response = await getYrData(this.props.locationId);
    this.setState({ weather: response });
  };

  intervalId: any;

  render() {
    return this.state.weather ? (
      <Cell area={this.props.area}>
        <Grid nested row=" 3.5fr 1fr 1fr 1fr">
          {this.state.weather.map((weather, index) => [
            index === 0 ? (
              <Grid key={uuidv4()} nested column="1fr 1fr">
                <Grid key={uuidv4()} nested row="1fr 1fr">
                  <TempNow>
                    {weather.temp}
                    {'°'}
                  </TempNow>
                  <DescriptionNow>
                    {getWeatherDescription(weather)}
                  </DescriptionNow>
                </Grid>
                <img
                  src={images[weather.symbol]}
                  alt="logo"
                  width="100%"
                  height="100%"
                />
              </Grid>
            ) : (
              <Grid key={uuidv4()} nested column="3.5fr 1fr 2fr 3fr">
                <Forecast>
                  {new Intl.DateTimeFormat(this.props.language, {
                    month: 'long',
                    day: '2-digit',
                  }).format(new Date(weather.start))}
                </Forecast>
                <img
                  src={images[weather.symbol]}
                  alt="logo"
                  width="100%"
                  height="100%"
                />
                <Forecast>
                  {weather.temp} {'°'}
                </Forecast>
                <Forecast>
                  {weather.precipitation}
                  {'mm nedbør'}
                </Forecast>
              </Grid>
            ),
          ])}
        </Grid>
      </Cell>
    ) : (
      <div>Loading...</div>
    );
  }
}

const TempNow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.h3};
  font-color: ${fontColor.primary};
`;

const DescriptionNow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.small};
  font-color: ${fontColor.primary};
`;

const Forecast = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.small};
  font-color: ${fontColor.primary};
`;

export default Yr;