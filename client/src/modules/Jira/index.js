// @flow
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { generateChartData } from './services';
import { Cell } from '../../containers';
import type { Props, State } from './types';
import { options } from './options';

const DATA_INTERVAL = 1000 * 60 * 60;
const ROTATE_INTERVAL = 1000 * 60;

class Jira extends React.Component<Props, State> {
  static defaultProps = {
    row: 'span 2',
    column: 'span 5',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      data: undefined,
      modeIndex: 0,
    };
  }

  componentDidMount() {
    this.dataTick();

    this.dataInterval = setInterval(this.dataTick, DATA_INTERVAL);
    this.rotateInterval = setInterval(this.rotateTick, ROTATE_INTERVAL);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.year !== this.props.year) {
      this.dataTick();
    }
  }

  componentWillUnmount() {
    clearInterval(this.dataInterval);
    clearInterval(this.rotateInterval);
  }

  dataTick = () => {
    generateChartData(
      this.props.projectKey,
      this.props.year,
      this.props.auth,
    ).then(data => {
      this.setState({
        data,
      });
    });
  };

  rotateTick = () => {
    this.setState(prevState => ({
      modeIndex:
        prevState.modeIndex < this.props.modeArray.length - 1
          ? prevState.modeIndex + 1
          : 0,
    }));
  };

  dataInterval: *;

  rotateInterval: *;

  render() {
    return (
      <Cell row={this.props.row} column={this.props.column}>
        {this.state.data ? (
          <Bar
            data={this.state.data[this.props.modeArray[this.state.modeIndex]]}
            options={options}
          />
        ) : (
          <div>Loading...</div>
        )}
      </Cell>
    );
  }
}

export default Jira;
