// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import Carousel from 'nuka-carousel';
import { onMount, onUnmount } from 'react-keydown/dist/event_handlers';
import { setBinding } from 'react-keydown/dist/store';
import { boards } from '../../App';
import type { Action } from '../../actions';
import { Cell } from '../index';
import Clock from '../../modules/Clock';
import config from './config';

type Props = {
  slideIndex: number,
  noMotionDetected: boolean,
  nextSlide: () => void,
  previousSlide: () => void,
  executeCommand: string => void,
  boardProps: {
    location: number[],
    year: number,
    sortBy: string,
  },
};

const REQUEST_INTERVAL = 1000 * 5;

class Caroussel extends React.PureComponent<Props> {
  componentDidMount() {
    onMount(this);

    this.requestInterval = setInterval(this.tick, REQUEST_INTERVAL);
  }

  componentWillUnmount() {
    onUnmount(this);
  }

  // disable eslint because setBinding cant find binded
  /* eslint-disable */
  onChangeSlide(event: any) {
    if (event.key === 'ArrowRight') {
      this.props.nextSlide();
    } else if (event.key === 'ArrowLeft') {
      this.props.previousSlide();
    }
  }

  tick = () => {
    if (!this.props.noMotionDetected) {
      fetch(config.proxyUrl + config.baseUrl)
        .then(response => response.text())
        .then(response => {
          const awsData = JSON.parse(response);

          if ('command' in awsData) {
            this.props.executeCommand(awsData.command, awsData.payload);

            //Clears command to avoid repetition
            fetch(config.proxyUrl + config.baseUrl, {
              method: 'POST',
              body: JSON.stringify({}),
            });

            this.render();
          }
        });
    }
  };

  requestInterval: *;

  render() {
    return (
      <SleepCell
        background={this.props.noMotionDetected ? 'black' : 'transparent'}
        margin={this.props.noMotionDetected ? '-5%' : '0'}>
        <VerticalContainer>
          <Clock
            style={{
              visibility: this.props.noMotionDetected ? 'hidden' : 'visible',
            }}
          />
          <Carousel
            slideIndex={this.props.slideIndex}
            style={{
              visibility: this.props.noMotionDetected ? 'hidden' : 'visible',
            }}>
            {boards(this.props.boardProps)}
          </Carousel>
        </VerticalContainer>
      </SleepCell>
    );
  }
}

setBinding({
  target: Caroussel.prototype,
  fn: Caroussel.prototype.onChangeSlide,
  keys: ['left', 'right'],
});

const ConnectedApp = connect(
  state => ({
    slideIndex: state.root.slideIndex,
    noMotionDetected: state.root.noMotionDetected,
    boardProps: state.root.boardProps,
  }),
  (dispatch: (action: Action) => void) => ({
    nextSlide: () => dispatch({ type: 'NEXT_BOARD' }),
    previousSlide: () => dispatch({ type: 'PREVIOUS_BOARD' }),
    executeCommand: (command, payload) => dispatch({ type: command, payload }),
  }),
)(Caroussel);

const SleepCell = props => (
  <Cell
    {...props}
    style={{
      width: '-webkit-fill-available',
      height: 'auto',
      backgroundColor: props.background,
      margin: props.margin,
    }}
  />
);

const VerticalContainer = styled('div')`
  width: 100%;
  height: 100vh;
`;

export default ConnectedApp;
