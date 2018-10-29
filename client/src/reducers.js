// @flow

import { combineReducers } from 'redux';
import type { Action } from './actions';
import { boards } from './App';

const NUMBER_OF_BOARDS = boards().length - 1;

type ReducerState = {
  noMotionDetected: boolean,
  slideIndex: number,
};

const initialState = {
  noMotionDetected: false,
  slideIndex: 0,
};

const rootReducer = (state: ReducerState = initialState, action: Action) => {
  switch (action.type) {
    case 'NEXT_BOARD':
      return {
        ...state,
        slideIndex:
          state.slideIndex < NUMBER_OF_BOARDS
            ? state.slideIndex + 1
            : state.slideIndex,
      };

    case 'PREVIOUS_BOARD':
      return {
        ...state,
        slideIndex:
          state.slideIndex > 0 ? state.slideIndex - 1 : state.slideIndex,
      };

    case 'MOTION_DETECTED':
      return {
        ...state,
        noMotionDetected: false,
      };

    case 'NO_MOTION_DETECTED':
      return {
        ...state,
        noMotionDetected: true,
      };

    default:
      return state;
  }
};

export default combineReducers({ rootReducer });