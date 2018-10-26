// @flow
import React, { Component } from 'react';
import styled from 'react-emotion';
import { getYrData } from './services';
import { fontColor, fontSize } from '../../styles/theme';
import Grid from '../../containers/Grid';
import type { Weather } from './types';
import { getWeatherDescription } from './utils';
import logo from './img/01d.svg';

type Props = {
  locationId: string,
};
type State = {
  weather: ?Array<Weather>,
};

class Yr extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      weather: undefined,
    };
  }

  async componentDidMount() {
    const response = await getYrData(this.props.locationId);
    this.setState({
      weather: response,
    });
  }

  render() {
    return this.state.weather ? (
      <Grid nested row="1fr 1fr" column="1fr">
        <Grid nested row="1fr" column="1fr 1fr">
          <Grid nested row="1fr 1fr" column="1fr">
            <TempNow>
              {this.state.weather[0].temp}
              {'°'}
            </TempNow>
            <DescriptionNow>
              {getWeatherDescription(this.state.weather[0])}
            </DescriptionNow>
          </Grid>
          <img src={logo} alt="logo" width="100%" height="100%" />
        </Grid>
        <Grid nested row="1fr 1fr 1fr" column="1fr">
          {this.state.weather.map(weather => [
            <Grid nested row="1fr" column="1fr 1fr 1fr">
              <Forecast>{new Intl.DateTimeFormat('nb-NO', {
                month: 'long',
                day: '2-digit'
              }).format(weather.start.firstSale)}</Forecast>
              <Forecast>{weather.temp} {'°'}</Forecast>
              <Forecast>{weather.precipitation}{"mm nedbør"}</Forecast>
            </Grid>
          ])}
        </Grid>
      </Grid>
    ) : (
      <div>Loading...</div>
    );
  }
}

const TempNow = styled('div')`
  font-size: ${fontSize.large};
  font-color: ${fontColor.primary};
`;

const DescriptionNow = styled('div')`
  font-size: ${fontSize.small};
  font-color: ${fontColor.primary};
`;

const Forecast = styled('div')`
  font-size: ${fontSize.small};
  font-color: ${fontColor.primary};
`;

export default Yr;
