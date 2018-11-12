// @flow

import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import { Grid } from '../../containers';

import config from './config';
import { getOAuthToken } from '../../ouath2';

import { Header, Button, Cell } from './components';

const POLL_INTERVAL = 600; // in seconds
// const fagLink = "https://calendar.google.com/calendar/ical/knowit.no_63rtu1seerufqsdhc4avduoggk%40group.calendar.google.com/private-eb08c8c086bf620989522c8d87d813ae/basic.ics";

type Props = {
  calendars: string[],
  maxResults: number,
};

type State = {
  calendarData: any,
  accessToken: ?string,
};

const API_URL = 'https://www.googleapis.com/calendar/v3/calendars/';

class Calendar extends Component<Props, State> {
  static defaultProps = {
    apiOptions: '&metrics=rt:activeUsers&dimensions=rt:deviceCategory',
  };

  constructor(props: Props) {
    super(props);
    this.state = { accessToken: undefined, calendarData: undefined };
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

  polling = async (accessToken: string) => {
    // Get events after the date of today.
    const date = new Date().toISOString();

    const myHeaders = new Headers({
      Authorization: `Bearer ${accessToken}`,
      'Content-length': '0',
    });

    const results = await Promise.all(
      this.props.calendars.map(s =>
        fetch(`${API_URL}${s}/events?timeMin=${date}`, { headers: myHeaders })
          .then(respose => respose.json())
          .catch(e => {
            console.log(`Calendar ${s} failed. Reason ${e}`);
            return Promise.resolve([]);
          }),
      ),
    );
    if (results[0].items !== null) {
      this.setState({
        calendarData: []
          .concat(...results.map(j => j.items))
          .filter(e => e != null)
          .filter(e => e.start.dateTime !== undefined)
          .sort(
            (a, b) =>
              new Date(a.start.dateTime).getTime() -
              new Date(b.start.dateTime).getTime(),
          )
          .slice(0, this.props.maxResults),
      });
    }
  };

  handleClick = async () => {
    const token = await getOAuthToken({ ...config });
    const accessToken = token.access_token;
    this.setState({ accessToken });
    this.polling(accessToken);
  };

  convertDateTimeToInTime = (dateTime: string) => {
    const dateNow = new Date();
    const dateEvent = new Date(dateTime);
    const timeDiff = Math.abs(dateEvent.getTime() - dateNow.getTime());
    const dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (dayDifference > 0) {
      if (dayDifference === 1) {
        return `${dayDifference} Day`;
      }

      return `${dayDifference} Days`;
    }

    const hourDifference = Math.ceil(timeDiff / (1000 * 3600));
    if (hourDifference > 0) {
      if (dayDifference === 1) {
        return `${hourDifference} Hour`;
      }

      return `${hourDifference} Hours`;
    }

    const minuteDifference = Math.ceil(timeDiff / (1000 * 60));
    if (dayDifference === 1) {
      return `${minuteDifference} Minute`;
    }

    return `${dayDifference} Minutes`;
  };

  intervalId: *;

  render() {
    console.log('Updated calendar');

    return (
      <Cell row="span 5" column="span 2">
        {this.state.calendarData ? (
          <Grid nested row="1fr 7fr" column="1fr">
            <Header>Upcomming Events </Header>
            <Grid nested row="repeat(6fr, 1fr)" style={{ height: 'auto' }}>
              <Grid nested column="4fr 1fr" style={{ height: 'auto' }}>
                <OverridedCell>Name</OverridedCell>
                <OverridedCell align="left">Time</OverridedCell>
              </Grid>
              {this.state.calendarData.map(event => [
                <Grid
                  nested
                  column="4fr 1fr"
                  key={uuidv4()}
                  style={{ height: 'auto' }}>
                  <OverridedCell>{event.summary}</OverridedCell>
                  <OverridedCell>
                    {this.convertDateTimeToInTime(event.start.dateTime)}
                  </OverridedCell>
                </Grid>,
              ])}
            </Grid>
          </Grid>
        ) : (
          <Button type="button" onClick={this.handleClick}>
            Press here for OAuth
          </Button>
        )}
      </Cell>
    );
  }
}

const OverridedCell = props => (
  <Cell {...props} style={{ padding: 0, backgroundColor: 'transparent' }} />
);

export default Calendar;
