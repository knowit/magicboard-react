// @flow
/* global gapi */

import React from 'react';
import type { Props, State } from './types';
import { Cell } from '../../containers';
import config from './config';

class Youtube extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: undefined,
    };
  }

  componentDidMount() {
    this.polling();

    this.intervalId = setInterval(this.tick, 1000 * 60 * 60);
  }

  polling = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js';
    script.onload = () => {
      gapi.load('client', () => {
        gapi.client.setApiKey(config.API_KEY);
        gapi.client.load('youtube', 'v3', () => {
          gapi.client.youtube.channels
            .list({
              part: 'snippet,contentDetails,statistics',
              id: this.props.channelId,
            })
            .then(response => {
              this.setState({ data: response.result.items[0] });
              console.log(response.result.items[0]);
            });
        });
      });
    };
    document.body.appendChild(script);
  };

  tick = () => {
    this.polling();
  };

  intervalId: any;

  render() {
    return (
      <Cell row={this.props.row} column={this.props.column}>
        {this.state.data ? (
          <div>{this.state.data.snippet.description}</div>
        ) : (
          <div>Loading...</div>
        )}
      </Cell>
    );
  }
}

export default Youtube;
