// @flow
/* global gapi */

import React from 'react';
import type { Props, State, Video } from './types';
import { Cell } from '../../containers';
import config from './config';

class Youtube extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      totalViews: 0,
      videos: [],
    };
  }

  componentDidMount() {
    this.polling();

    this.intervalId = setInterval(this.tick, 1000 * 60 * 60);
  }

  pollPage = (gapiClient, token) => {
    gapiClient.load('youtube', 'v3', () => {
      gapiClient.youtube.playlistItems
        .list({
          part: 'snippet, contentDetails',
          playlistId: 'PLsq5f12DtrClQmTsvs2IUFmJ2GDGyl8TH',
          maxResults: 50,
          pageToken: token,
        })
        .then(response => {
          for (let i = 0; i < response.result.items.length; i += 1) {
            gapiClient.youtube.videos
              .list({
                part: 'snippet, statistics',
                id: response.result.items[i].contentDetails.videoId,
              })
              .then(videoResponse => {
                if (videoResponse.result.items[0]) {
                  const video: Video = {
                    title: videoResponse.result.items[0].snippet.title,
                    description:
                      videoResponse.result.items[0].snippet.description,
                    thumbnail:
                      videoResponse.result.items[0].snippet.thumbnails.default
                        .url,
                    views: videoResponse.result.items[0].statistics.viewCount,
                    likes: videoResponse.result.items[0].statistics.likeCount,
                  };
                  this.setState(prevState => ({
                    totalViews:
                      parseInt(prevState.totalViews, 10) +
                      parseInt(video.views, 10),
                    videos: [...prevState.videos, video],
                  }));
                }
              });
          }
          // Since max videos per page is 50, new pages are fetched as long as there are more videos
          if (response.result.nextPageToken) {
            this.pollPage(gapiClient, response.result.nextPageToken);
          }
        });
    });
  };

  polling = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js';
    script.onload = () => {
      gapi.load('client', () => {
        gapi.client.setApiKey(config.API_KEY);

        this.pollPage(gapi.client, '');
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
        {this.state.totalViews ? (
          <div>{this.state.totalViews}</div>
        ) : (
          <div>Loading...</div>
        )}
      </Cell>
    );
  }
}

export default Youtube;
