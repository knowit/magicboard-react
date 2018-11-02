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
import { getOAuthToken } from '../../ouath2';

import type { RealTimeResult } from '../../ouath2/types';

const POLL_INTERVAL = 10; // in seconds

type Props = {
  // find metrics and options at https://developers.google.com/analytics/devguides/reporting/realtime/dimsmets/
  apiOptions: string,
  // View id is obtainable only in google analytics project https://keyword-hero.com/documentation/finding-your-view-id-in-google-analytics
  viewId: string,
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
    this.state = { rtData: undefined, accessToken: undefined };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      this.state.accessToken &&
      prevState.accessToken !== this.state.accessToken
    ) {
      const { accessToken } = this.state;
      this.intervalId = setInterval(
        () => this.polling(accessToken),
        1000 * POLL_INTERVAL,
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
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
    const token = await getOAuthToken({ ...config });
    const accessToken = token.access_token;
    this.setState({ accessToken });
    this.polling(accessToken);
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
      <Cell row="span 2" column="span 2">
        {this.state.rtData ? (
          categoryPercentages && (
            <Container>
              <Header>Global Digital Library</Header>
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
