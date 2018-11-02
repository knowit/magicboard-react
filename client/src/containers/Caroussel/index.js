// @flow
import React from 'react';
import { connect } from 'react-redux';
import Carousel from 'nuka-carousel';
import { onMount, onUnmount } from 'react-keydown/dist/event_handlers';
import { setBinding } from 'react-keydown/dist/store';
import { boards } from '../../App';

import { ButtonContainer, Button } from './components';

import type { Action } from '../../actions';

type Props = {
  slideIndex: number,
  viewMode: 'landscape' | 'portrait',
  switchViewMode: () => void,
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

  switchMode = () => {
    console.log('switched');
    this.props.switchViewMode();
  };

  render() {
    return (
      <React.Fragment>
        <ButtonContainer>
          <Button type="button" onClick={this.switchMode}>
            switch view mode
          </Button>
        </ButtonContainer>
        <Carousel slideIndex={this.props.slideIndex}>
          {boards(this.props.viewMode)}
        </Carousel>
      </React.Fragment>
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
    viewMode: state.rootReducer.viewMode,
    slideIndex: state.rootReducer.slideIndex,
  }),
  (dispatch: (action: Action) => void) => ({
    nextSlide: () => dispatch({ type: 'NEXT_BOARD' }),
    previousSlide: () => dispatch({ type: 'PREVIOUS_BOARD' }),
    switchViewMode: () => dispatch({ type: 'SWITCH_VIEW_MODE' }),
  }),
)(Caroussel);

export default ConnectedApp;
