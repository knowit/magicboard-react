// @flow
import React, { Component } from 'react';
import moment from 'moment-with-locales-es6';
import 'moment-timezone';
import styled from 'react-emotion';
import Grid from '../../containers/Grid';
import { fontColor, fontSize } from '../../styles/theme';

type Props = {};
type State = {
  time: string,
  date: string,
};

class Clock extends Component<Props, State> {
  constructor() {
    super();
    moment.locale('nb');
    this.state = {
      time: moment().format('H:mm'),
      date: moment().format('dddd DD. MMMM'),
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  tick = () =>
    this.setState({
      time: moment().format('H:mm'),
      date: moment().format('dddd DD. MMMM'),
    });

  render() {
    return (
      <Grid nested row="2fr 1fr" column="1fr">
        <CenteredCell row="1">
          <Time>{this.state.time}</Time>
        </CenteredCell>
        <CenteredCell row="2">
          <Date>{this.state.date}</Date>
        </CenteredCell>
      </Grid>
    );
  }
}

const Date = styled('div')`
  font-size: ${fontSize.medium};
  font-color: ${fontColor.primary};
`;

const Time = styled('div')`
  font-size: ${fontSize.h2};
  font-color: ${fontColor.primary};
`;

const CenteredCell = styled('div')`
  display: ${'flex'};
  align-items: ${'center'};
  justify-content: ${'center'};
  flex-direction: ${'column'};
`;

export default Clock;
