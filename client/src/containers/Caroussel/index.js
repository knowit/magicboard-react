// @flow
import React from 'react';
import { connect } from 'react-redux';
import Carousel from 'nuka-carousel';
import { onMount, onUnmount } from 'react-keydown/dist/event_handlers';
import { setBinding } from 'react-keydown/dist/store';
import { boards } from '../../App';
import type { Action } from '../../actions';
import { Cell } from '../index';

type Props = {
  slideIndex: number,
  noMotionDetected: boolean,
  nextSlide: () => void,
  previousSlide: () => void,
};

class Caroussel extends React.PureComponent<Props> {
  componentDidMount() {
    onMount(this);
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

  render() {
    return (
      <SleepCell
        background={this.props.noMotionDetected ? 'black' : 'transparent'}
        margin={this.props.noMotionDetected ? '-5%' : '0'}>
        <Carousel withoutControls slideIndex={this.props.slideIndex} style={{visibility: this.props.noMotionDetected ? 'hidden' : 'visible'}}>
          {boards()}
        </Carousel>
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
    slideIndex: state.rootReducer.slideIndex,
    noMotionDetected: state.rootReducer.noMotionDetected,
  }),
  (dispatch: (action: Action) => void) => ({
    nextSlide: () => dispatch({ type: 'NEXT_BOARD' }),
    previousSlide: () => dispatch({ type: 'PREVIOUS_BOARD' }),
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

export default ConnectedApp;
