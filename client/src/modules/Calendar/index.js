/* eslint-disable no-console */
// @flow

import React, {Component} from 'react';
import uuidv4 from 'uuid/v4';
import {connect} from 'react-redux';
import {Grid} from '../../containers';
import {getAuthentication} from '../../actions';

import {Header, Button, Cell} from './components';
import type {Props, State, CalendarRaw} from './types';
import {convertDateTimeToInTime} from './utils';

const POLL_INTERVAL = 1000; // seconds

const API_URL = 'https://www.googleapis.com/calendar/v3/calendars/';


class Calendar extends Component<Props, State> {

  static defaultProps = {
    row: 'span 3',
    column: 'span 3',
    apiOptions: '&metrics=rt:activeUsers&dimensions=rt:deviceCategory',
  };


  constructor(props: Props) {
    super(props);
    this.state = {calendarData: undefined};
  }

  componentDidUpdate() {
    if (this.props.accessToken && !this.intervalId) {
      this.polling();
      this.intervalId = setInterval(
        () => this.polling(),
        60 * POLL_INTERVAL,
      );
    }
  }


  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  polling = async () => {
    // Get events after the date of today.
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const date = (new Date(Date.now() - tzoffset)).toISOString();
    console.log(date);

    if (this.props.accessToken) {
      const myHeaders = new Headers({
        Authorization: `Bearer ${this.props.accessToken}`,
        'Content-length': '0',
      });

      const results = await Promise.all(
        this.props.calendars.map(s =>
          fetch(`${API_URL}${s}/events?timeMin=${date}`, {headers: myHeaders})
            .then(response => response.json())
            .catch(e => {
              console.log(`Calendar ${s} failed. Reason ${e}`);
              return Promise.resolve({items: []});
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
    }
  };

  handleClick = () => {
    if (!this.props.fetching) {
      this.props.getAuthentication();
    }
  };

  intervalId: *;


  render() {
    return (
      <Cell row={this.props.row} column={this.props.column}>
        {this.state.calendarData ? (
          <Grid nested row="1fr 7fr" column="1fr">
            <Header>Upcoming Events </Header>
            <Grid nested row="repeat(6fr, 1fr)" style={{height: 'auto'}}>
              <Grid nested column="4fr 1fr" style={{height: 'auto'}}>
                <OverridedCell>Name</OverridedCell>
                <OverridedCell align="left">Time</OverridedCell>
              </Grid>
              {this.state.calendarData.map(event => [
                <Grid
                  nested
                  column="4fr 1fr"
                  key={uuidv4()}
                  style={{height: 'auto'}}>
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
  <Cell {...props} style={{padding: 0, backgroundColor: 'transparent'}}/>
);

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
  fetching: state.auth.fetching,
});

const mapDispatchToProps = {
  getAuthentication
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
