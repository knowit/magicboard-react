// @flow
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { generateChartData } from './services';
import { Cell } from '../../containers';
import type { Props, State } from './types';
import { Mode } from './types';
import { options } from './options';

const DATA_INTERVAL = 1000 * 60 * 60;

class Jira extends React.Component<Props, State> {
  static defaultProps = {
    row: 'span 2',
    column: 'span 5',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      data: undefined,
    };
  }

  componentDidMount() {
    this.dataTick();

    this.dataInterval = setInterval(this.dataTick, DATA_INTERVAL);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.numMonths !== this.props.numMonths) {
      this.dataTick();
    }
  }

  componentWillUnmount() {
    clearInterval(this.dataInterval);
  }

  dataTick = () => {
    generateChartData(
      this.props.projectKey,
      this.props.numMonths,
      this.props.auth,
    ).then(data => {
      this.setState({
        data,
      });
    });
  };

  dataInterval: *;

  render() {
    if (this.state.data) {
      return (
        <Cell row={this.props.row} column={this.props.column}>
          {this.props.mode === Mode.TIME ? (
            <Line data={this.state.data[this.props.mode]} options={options} />
          ) : (
            <Bar data={this.state.data[this.props.mode]} options={options} />
          )}
        </Cell>
      );
    }
    return (
      <Cell row={this.props.row} column={this.props.column}>
        <div>Loading...</div>
      </Cell>
    );
  }
}

export default Jira;
