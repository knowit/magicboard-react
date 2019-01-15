// @flow

/* eslint no-underscore-dangle: 0 */

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { xml2js } from 'xml-js';
import moment from 'moment';
import { headers, body } from './fetchOptions';
import { Cell } from '../../containers';
import config from './config';
import { options, dataObject } from './options';

type Props = {
  row?: string,
  column?: string,
  maxMonths: number,
};
type State = {
  data: ?Object,
};

const INTERVAL = 60 * 60 * 24;

class UBW extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: undefined,
    };
  }

  componentDidMount() {
    this.polling();

    this.intervalId = setInterval(this.tick, INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  polling = () => {
    fetch(config.proxyUrl + config.baseUrl, {
      method: 'POST',
      headers,
      body,
    })
      .then(res => res.text())
      .then(res => xml2js(res, { compact: true }))
      .then(res => {
        const text =
          res['s:Envelope']['s:Body'].GetTemplateResultAsXMLResponse
            .GetTemplateResultAsXMLResult.TemplateResult._text;

        const dataArray = xml2js(text, { compact: true }).Agresso.AgressoQE;

        const hoursUsed: number[] = [];
        const labels: string[] = [];

        for (let i = 0; i < dataArray.length - 1; i += 1) {
          const date = moment(dataArray[i].reg_period._text, 'YYYYWW');

          // B is approved, also only recent data points are included
          if (
            dataArray[i].tab._text === 'B' &&
            date.isAfter(moment().subtract(this.props.maxMonths, 'months'))
          ) {
            hoursUsed.push(parseInt(dataArray[i].used_hrs._text, 10));
            labels.push(date.format('YYYY/W'));
          }
        }

        dataObject.label = 'Fagtimer per uke fra UBW';
        dataObject.data = hoursUsed;

        const chartData = {
          datasets: [dataObject],
          labels,
        };

        this.setState({
          data: chartData,
        });
      });
  };

  tick = () => {
    this.polling();
  };

  intervalId: *;

  render() {
    return (
      <Cell row={this.props.row} column={this.props.column}>
        {this.state.data ? (
          <Bar data={this.state.data} options={options} />
        ) : (
          <div>Loading...</div>
        )}
      </Cell>
    );
  }
}

export default UBW;
