// @flow
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { generateChartData } from './services';
import { Cell } from '../../containers';
import type { Props, State } from './types';

const TIME_INTERVAL = 1000 * 60;

class Jira extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: undefined,
      options: undefined,
      modeIndex: 0,
    };
  }

  componentDidMount() {
    generateChartData(
      this.props.projectKey,
      this.props.year,
      this.props.modeArray[this.state.modeIndex],
    ).then(({ data, options }) => {
      this.setState(prevState => ({
        data,
        options,
        modeIndex:
          prevState.modeIndex < this.props.modeArray.length - 1
            ? prevState.modeIndex + 1
            : 0,
      }));
    });

    this.intervalId = setInterval(this.tick, TIME_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  tick = () => {
    generateChartData(
      this.props.projectKey,
      this.props.year,
      this.props.modeArray[this.state.modeIndex],
    ).then(({ data, options }) => {
      this.setState(prevState => ({
        data,
        options,
        modeIndex:
          prevState.modeIndex < this.props.modeArray.length - 1
            ? prevState.modeIndex + 1
            : 0,
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
