// @flow
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { generateChartData } from './services';
import { Cell } from '../../containers';
import type { Props, State } from './types';
import { TimeInterval } from './types';

const TIME_INTERVAL = 1000 * 60;

class Jira extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: undefined,
      options: undefined,
      timeInterval: TimeInterval.MONTH,
    };
  }

  componentDidMount() {
    generateChartData(
      this.props.projectKey,
      this.props.year,
      this.state.timeInterval,
    ).then(({ data, options }) => {
      this.setState(() => ({
        data,
        options,
      }));
    });

    this.intervalId = setInterval(this.tick, TIME_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  tick = () => {
    if (this.state.timeInterval === TimeInterval.MONTH) {
      this.setState({ timeInterval: TimeInterval.WEEK });
    } else if (this.state.timeInterval === TimeInterval.WEEK) {
      this.setState({ timeInterval: TimeInterval.MONTH });
    }

    generateChartData(
      this.props.projectKey,
      this.props.year,
      this.state.timeInterval,
    ).then(({ data, options }) => {
      this.setState(() => ({
        data,
        options,
      }));
    });
  };

  intervalId: any;

  render() {
    return (
      <Cell row="span 2" column="span 5">
        {this.state.data ? (
          <Bar data={this.state.data} options={this.state.options} />
        ) : (
          <div>Loading...</div>
        )}
      </Cell>
    );
  }
}

export default Jira;
