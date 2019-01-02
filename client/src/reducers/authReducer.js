// @flow

import type {Action} from '../actions';


type ReducerState = {
  accessToken: ?string,
  refreshToken: ?string,
  fetching: boolean,
};

const initialState: ReducerState = {
  accessToken: null,
  refreshToken: null,
  fetching: false
};

const authReducer = (state: ReducerState = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_AUTH_TOKENS':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
    case 'FETCHING_AUTH_TOKENS':
      return {
        ...state,
        fetching: true
      };

    case 'ERROR_FETCHING_TOKENS':
      return initialState;


    default:
      return state;
  }
};

export default authReducer;
