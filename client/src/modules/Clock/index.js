// @flow
import React, { Component } from 'react';
import moment from 'moment';
import styled from 'react-emotion';
import { Cell } from '../../containers';
import { fontFamily, fontSize } from '../../styles/theme';

type Props = {
  row?: string,
  column?: string,
  style?: Object,
  children?: Object,
};
type State = {
  time: string,
  date: string,
};

class Clock extends Component<Props, State> {
  static defaultProps = {
    row: 'span 2',
    column: 'span 10',
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
    return (
      <CenteredCell {...this.props}>
        <Time>{this.state.time}</Time>
        <Date>{this.state.date}</Date>
      </CenteredCell>
    );
  }
}

const Time = styled('p')`
  height: fit-content;
  margin-top: 116px;
  font-size: ${fontSize.h3};
  font-family: ${fontFamily.primary};
  font-feature-settings: 'lnum' 1;
`;

const Date = styled('p')`
  height: fit-content;
  margin-top: -170px;
  margin-bottom: 40px;
  font-size: ${fontSize.medium};
  font-family: ${fontFamily.primary};
  font-feature-settings: 'lnum' 1;
`;

const CenteredCell = (props: Props) => (
  <Cell
    row={props.row || 'span 3'}
    column={props.column || 'span 3'}
    style={{
      ...props.style,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: 'transparent',
    }}>
    {props.children}
  </Cell>
);

export default Clock;
