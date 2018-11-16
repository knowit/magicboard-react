/* eslint-disable no-console */
// @flow

import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import { Grid } from '../../containers';
import config from './config';
import { getOAuthToken } from '../../ouath2/index';
import { Header, Button, Cell } from './components';
import type { Props, State, CalendarRaw } from './types';
import { convertDateTimeToInTime } from './utils';

const POLL_INTERVAL = 600; // in seconds

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
          .then(response => response.json())
          .catch(e => {
            console.log(`Calendar ${s} failed. Reason ${e}`);
            return Promise.resolve({ items: [] });
          }),
      ),
    );
    if (results[0].items !== null) {
      this.setState({
        calendarData: []
          .concat(...results.map((j: CalendarRaw) => j.items))
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

  intervalId: *;

  render() {
    console.log('Updated calendar');

    return (
      <Cell row="span 3" column="span 3">
        {this.state.calendarData ? (
          <Grid nested row="1fr 7fr" column="1fr">
            <Header>Upcoming Events </Header>
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
                    {convertDateTimeToInTime(event.start.dateTime)}
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
