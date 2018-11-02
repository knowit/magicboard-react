// @flow
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Cell } from '../../containers';
import { generateChartData } from './services';
import 'chartjs-plugin-datalabels';

type Props = {
  symbol: string,
  apikey: string,
  type: string,
  numberOfDatapoints: number,
};

type State = {
  data: ?Object,
  options: ?Object,
};

class Stock extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      data: undefined,
      options: undefined,
    };
  }

  async componentDidMount() {
    const response = await generateChartData(this.props);
    this.setState({
      data: response.data,
      options: response.options,
    });
  }

  render() {
    return (
      <Cell row="span 2" column="span 3">
        {this.state.data ? (
          <Line data={this.state.data} options={this.state.options} />
        ) : (
          <div>Loading...</div>
        )}
      </Cell>
    );
  }
}

export default Stock;
