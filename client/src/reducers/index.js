// @flow

import {combineReducers} from 'redux';
import type {Action} from '../actions';
import {boards} from '../App';

import authReducer from './authReducer';

const NUMBER_OF_BOARDS = boards().length - 1;

type ReducerState = {
  noMotionDetected: boolean,
  slideIndex: number,
  googleAction: ?string,
};

const initialState = {
  noMotionDetected: false,
  slideIndex: NUMBER_OF_BOARDS === 0 ? NUMBER_OF_BOARDS : 1,
  googleAction: undefined,
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

    case 'GENERAL_INFO_BOARD':
      return {
        ...state,
        slideIndex: 0,
      };

    case 'BUILDING_INFO_BOARD':
      return {
        ...state,
        slideIndex: 1,
      };

    case 'SALES_INFO_BOARD':
      return {
        ...state,
        slideIndex: 2,
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

export default combineReducers({
  root: rootReducer,
  auth: authReducer
});
