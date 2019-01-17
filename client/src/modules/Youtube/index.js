// @flow

import React from 'react';
import moment from 'moment';
import type { Props, State, Video } from './types';
import { Cell } from '../../containers';
import config from './config';
import {
  ColContainer,
  RowContainer,
  Header,
  SubHeader,
  IconContainer,
  InfoContainer,
  ViewContainer,
  LikeContainer,
  VideoList,
  VideoHeader,
  VideoContainer,
  ImageContainer,
  VideoInfoContainer,
} from './components';
import youtubeIcon from '../../styles/images/yt_icon_rgb.png';

declare var gapi: any;

class Youtube extends React.Component<Props, State> {
  static defaultProps = {
    videoFilter: '',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      totalViews: 0,
      totalLikes: 0,
      videos: [],
      numVideos: 0,
    };
  }

  componentDidMount() {
    this.polling();

    // Gets playlist name
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/client.js';
    script.onload = () => {
      gapi.load('client', () => {
        gapi.client.setApiKey(config.API_KEY);
        gapi.client.load('youtube', 'v3', () => {
          gapi.client.youtube.playlists
            .list({
              part: 'snippet',
              id: 'PLsq5f12DtrClQmTsvs2IUFmJ2GDGyl8TH',
            })
            .then(response => {
              this.setState({
                playlistName: response.result.items[0].snippet.title,
              });
            });
        });
      });
    };

    if (document.body) {
      document.body.appendChild(script);
    }

    this.intervalId = setInterval(this.tick, 1000 * 60 * 60);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.videoFilter !== this.props.videoFilter) {
      this.tick();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  videosEqual = (a: Video, b: Video) =>
    a.title === b.title &&
    a.thumbnail === b.thumbnail &&
    a.views === b.views &&
    a.likes === b.likes;

  pollPage = (gapiClient: any, token: string) => {
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
                part: 'snippet, statistics, contentDetails',
                id: response.result.items[i].contentDetails.videoId,
              })
              .then(videoResponse => {
                // Video is not private
                if (videoResponse.result.items[0]) {
                  // Video has a min duration && title contains filter string
                  if (
                    moment
                      .duration(
                        videoResponse.result.items[0].contentDetails.duration,
                      )
                      .asMinutes() > this.props.minLength &&
                    videoResponse.result.items[0].snippet.title
                      .toLowerCase()
                      .includes(this.props.videoFilter.toLowerCase())
                  ) {
                    const video: Video = {
                      title: videoResponse.result.items[0].snippet.title,
                      thumbnail:
                        videoResponse.result.items[0].snippet.thumbnails.medium
                          .url,
                      views: videoResponse.result.items[0].statistics.viewCount
                        ? videoResponse.result.items[0].statistics.viewCount
                        : 0,
                      likes: videoResponse.result.items[0].statistics.likeCount
                        ? videoResponse.result.items[0].statistics.likeCount
                        : 0,
                      duration: moment
                        .utc(
                          moment
                            .duration(
                              videoResponse.result.items[0].contentDetails
                                .duration,
                            )
                            .asMilliseconds(),
                        )
                        .format('HH:mm:ss'),
                    };

                    // Skips duplicates
                    if (
                      !this.state.videos
                        .map(x => this.videosEqual(x, video))
                        .includes(true)
                    ) {
                      this.setState(prevState => ({
                        totalViews:
                          parseInt(prevState.totalViews, 10) +
                          parseInt(video.views, 10),
                        totalLikes:
                          parseInt(prevState.totalLikes, 10) +
                          parseInt(video.likes, 10),
                        videos: [...prevState.videos, video],
                      }));
                    }
                  }
                }
              });
          }
          // Since max videos per page is 50, new pages are fetched as long as there are more videos
          if (response.result.nextPageToken) {
            this.pollPage(gapiClient, response.result.nextPageToken);
          } else {
            this.setState(prevState => ({
              numVideos: Math.min(
                prevState.videos.length,
                this.props.maxVideos,
              ),
              // Sorts videos by views
              videos: prevState.videos
                .sort((a, b) => b.views - a.views)
                .slice(0, this.props.maxVideos),
            }));
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
    if (document.body) {
      document.body.appendChild(script);
    }
  };

  tick = () => {
    this.setState({
      totalViews: 0,
      totalLikes: 0,
      videos: [],
    });
    this.polling();
  };

  intervalId: any;

  render() {
    const videoRows = [];
    console.log(this.state.numVideos);
    console.log(this.state.videos.length);
    if (this.state.videos[this.state.numVideos - 1]) {
      for (let i = 0; i < this.state.numVideos; i += 1) {
        videoRows.push(
          <VideoContainer key={i}>
            <ImageContainer src={this.state.videos[i].thumbnail} alt="" />
            <VideoInfoContainer>
              <VideoHeader>{this.state.videos[i].title}</VideoHeader>
              <InfoContainer>
                <ViewContainer small>{`${
                  this.state.videos[i].views
                } views`}</ViewContainer>
                <LikeContainer small>
                  {this.state.videos[i].duration}
                </LikeContainer>
              </InfoContainer>
            </VideoInfoContainer>
          </VideoContainer>,
        );
      }
    } else {
      if (this.state.numVideos === 0) {
        return (
          <Cell row={this.props.row} column={this.props.column}>
            <div>{`No videos fit search term: ${this.props.videoFilter}`}</div>
          </Cell>
        );
      }
      return (
        <Cell row={this.props.row} column={this.props.column}>
          <div>Loading...</div>
        </Cell>
      );
    }

    return (
      <Cell row={this.props.row} column={this.props.column}>
        <ColContainer>
          <RowContainer>
            <IconContainer src={youtubeIcon} alt="" />
            <Header>{this.state.playlistName}</Header>
          </RowContainer>
          <SubHeader>{`Longer than ${this.props.minLength} minutes`}</SubHeader>
          <InfoContainer>
            <ViewContainer>{`${this.state.totalViews} views`}</ViewContainer>
            <LikeContainer>{`${this.state.totalLikes} likes`}</LikeContainer>
          </InfoContainer>
          <Header small>{`Top ${this.props.videoFilter} videos`}</Header>
          <VideoList>{videoRows}</VideoList>
        </ColContainer>
      </Cell>
    );
  }
}

export default Youtube;
