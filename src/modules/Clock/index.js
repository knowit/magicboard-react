// @flow
import React, { Component } from 'react';
import moment from 'moment';
import styled from 'react-emotion';
import { Cell } from '../../containers';
import { fontSize } from '../../styles/theme';

type Props = { row: string, column: string };
type State = {
  time: string,
  date: string,
};

class Clock extends Component<Props, State> {
  static defaultProps = {
    row: 'span 1',
    column: 'span 5',
  };

  constructor(props: Props) {
    super(props);
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

  intervalId: *;

  render() {
    const { row, column } = this.props;
    return (
      <CenteredCell row={row} column={column}>
        <Time>{this.state.time}</Time>
        <Date>{this.state.date}</Date>
      </CenteredCell>
    );
  }
}

const Time = styled('div')`
  font-size: ${fontSize.h2};
`;

const Date = styled('div')`
  margin-top: 20px;
  font-size: ${fontSize.medium};
`;

const CenteredCell = props => (
  <Cell
    {...props}
    style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: 'transparent',
    }}
  />
);

export default Clock;
