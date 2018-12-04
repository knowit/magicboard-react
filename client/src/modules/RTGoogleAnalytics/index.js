/* eslint-disable no-console */
// @flow
import React from 'react';

import { Cell } from '../../containers';
import {
  Container,
  Header,
  SubHeader,
  CategoryBar,
  Mobile,
  Desktop,
  Tablet,
  RowContainer,
  Label,
  Square,
  Active,
  Button,
} from './components';
import { parseRTData, calculatePercentage } from './utils';
import config from './config';
import {getNewAuthToken, getOAuthToken} from '../../ouath2/index';

import type { RealTimeResult } from '../../ouath2/types';

const POLL_INTERVAL = 1000; // seconds

type Props = {
  // find metrics and options at https://developers.google.com/analytics/devguides/reporting/realtime/dimsmets/
  apiOptions: string,
  // View id is obtainable only in google analytics project https://keyword-hero.com/documentation/finding-your-view-id-in-google-analytics
  viewId: string,
  name: string,
};

type State = {
  rtData: ?Object,
  accessToken: ?string,
};

const API_URL = 'https://www.googleapis.com/analytics/v3/data/realtime?ids=ga:';

class RTGoogleAnalytics extends React.Component<Props, State> {
  static defaultProps = {
    apiOptions: '&metrics=rt:activeUsers&dimensions=rt:deviceCategory',
  };

  constructor(props: Props) {
    super(props);
    this.state = { rtData: undefined, accessToken: undefined, refreshToken : undefined};
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      this.state.accessToken &&
      prevState.accessToken !== this.state.accessToken
    ) {
      const { accessToken } = this.state;
      this.intervalId = setInterval(
        () => this.polling(accessToken),
        10 * POLL_INTERVAL,
      );

        this.intervalId2 = setInterval(
          async () => {const token = await getNewAuthToken({...config}, this.state.refreshToken);
            this.state.accessToken = token.access_token;
            console.log('New access token',this.state.accessToken)},
          3600 * POLL_INTERVAL,
        );

    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    clearInterval(this.intervalId2);

  }

  polling = (accessToken: string) => {
    const url = `${API_URL}${this.props.viewId}${
      this.props.apiOptions
    }&access_token=${accessToken}`;

    fetch(url)
      .then(result => result.json())
      .then((data: RealTimeResult) => {
        this.setState({ rtData: parseRTData(data) });
      })
      .catch(error => console.log(error));
  };

  handleClick = async () => {
      try {
          const token = await getOAuthToken({...config});
          this.setState({accessToken: token.access_token, refreshToken: token.refresh_token});
          this.polling(this.state.accessToken);

      }
      catch(err){
          console.log(err);
      }
  };

  intervalId: *;

  render() {
    const categoryPercentages =
      this.state.rtData &&
      calculatePercentage(
        this.state.rtData.deviceCategory,
        this.state.rtData.currentActiveUsers,
      );
    return (
      <Cell row="span 3" column="span 5">
        {this.state.rtData ? (
          categoryPercentages && (
            <Container>
              <Header>{this.props.name}</Header>
              <SubHeader>Right now</SubHeader>
              <Active>{this.state.rtData.currentActiveUsers}</Active>
              <SubHeader>active users</SubHeader>
              <RowContainer>
                <RowContainer>
                  <Square color="#50b432" />
                  <Label>Mobile</Label>
                </RowContainer>
                <RowContainer>
                  <Square color="#ed561b" />
                  <Label>Desktop</Label>
                </RowContainer>
                <RowContainer>
                  <Square color="#058dc7" />
                  <Label>Tablet</Label>
                </RowContainer>
              </RowContainer>
              <CategoryBar>
                <Mobile value={categoryPercentages.mobile}>
                  {categoryPercentages.mobile}%
                </Mobile>
                <Desktop value={categoryPercentages.desktop}>
                  {categoryPercentages.desktop}%
                </Desktop>
                <Tablet value={categoryPercentages.tablet}>
                  {categoryPercentages.tablet}%
                </Tablet>
              </CategoryBar>
            </Container>
          )
        ) : (
          <Button type="button" onClick={this.handleClick}>
            Press here for OAuth
          </Button>
        )}
      </Cell>
    );
  }
}

export default RTGoogleAnalytics;
