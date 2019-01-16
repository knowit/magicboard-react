// @flow

import { combineReducers } from 'redux';
import type { Action } from '../actions';
import { boards } from '../App';
import authReducer from './authReducer';

const NUMBER_OF_BOARDS = boards().length - 1;

const LOCATIONS: number[][] = [
  [59.916986, 10.762479], // Sundt
  [59.912771, 10.761277], // Grønland
  [59.911803, 10.750602], // Jernbanetorget
  [59.920667, 10.75928], // Schous plass
  [59.914936, 10.775035], // Tøyen
];

type ReducerState = {
  noMotionDetected: boolean,
  slideIndex: number,
  googleAction: ?string,
  boardProps: {
    location: number[],
    year: number,
    sortBy: string,
  },
};

const initialState = {
  noMotionDetected: false,
  slideIndex: NUMBER_OF_BOARDS === 0 ? NUMBER_OF_BOARDS : 1,
  googleAction: undefined,
  boardProps: {
    location: LOCATIONS[0],
    year: new Date().getFullYear(),
    sortBy: 'latest',
  },
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

    case 'UBW_INFO_BOARD':
      return {
        ...state,
        slideIndex: 3,
      };

    case 'MEDIA_CONTENT_BOARD':
      return {
        ...state,
        slideIndex: 4,
      };

    case 'NEXT_LOCATION': {
      const locationIndex = LOCATIONS.indexOf(state.boardProps.location);
      return {
        ...state,
        boardProps: {
          ...state.boardProps,
          location:
            locationIndex < LOCATIONS.length - 1
              ? LOCATIONS[locationIndex + 1]
              : LOCATIONS[0],
        },
      };
    }

    case 'SET_YEAR':
      return {
        ...state,
        boardProps: {
          ...state.boardProps,
          year: action.payload,
        },
      };

    case 'SET_BLOG_SORT':
      return {
        ...state,
        boardProps: {
          ...state.boardProps,
          sortBy: action.payload,
        },
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
  auth: authReducer,
});
