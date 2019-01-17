// @flow
import { Dispatch } from 'redux';
import config from './ouath2/config';
import { getNewAuthToken, getOAuthToken } from './ouath2/index';

const POLL_INTERVAL = 1000; // 1second

export type Action =
  // Root action
  | { type: 'MOTION_DETECTED' }
  | { type: 'NO_MOTION_DETECTED' }
  | { type: 'FACIAL_RECOGNITION_TO GGLED' }
  | { type: 'NEXT_BOARD' }
  | { type: 'PREVIOUS_BOARD' }
  | { type: 'GENERAL_INFO_BOARD' }
  | { type: 'BUILDING_INFO_BOARD' }
  | { type: 'SALES_INFO_BOARD' }
  | { type: 'NEXT_LOCATION' }
  | { type: 'SET_YEAR', payload: number }
  | { type: 'FILTER_VIDEOS', payload: string }
  | { type: 'SHOW_ALL_VIDEOS' }
  | { type: 'UNKNOWN_BUTTON_PAYLOAD', payload: number }

  // Auth actions
  | {
      type: 'SET_AUTH_TOKENS',
      payload: { accessToken: string, refreshToken: string },
    }
  | { type: 'SET_AUTH_ACCESS_TOKEN', payload: string }
  | { type: 'ERROR_FETCHING_TOKENS' }
  | { type: 'FETCHING_AUTH_TOKENS' };

const setTokens = (accessToken: string, refreshToken: string) => ({
  type: 'SET_AUTH_TOKENS',
  payload: { accessToken, refreshToken },
});

const fetchingTokens = () => ({ type: 'FETCHING_AUTH_TOKENS' });
const failedFetchingTokens = () => ({ type: 'ERROR_FETCHING_TOKENS' });

export const getAuthentication = () => (dispatch: Dispatch) => {
  dispatch(fetchingTokens());
  getOAuthToken({ ...config })
    .then(tokens => {
      dispatch(setTokens(tokens.access_token, tokens.refresh_token));
      setInterval(() => {
        getNewAuthToken({ ...config }, tokens.refresh_token).then(token => {
          dispatch(setTokens(token.access_token, tokens.refresh_token));
          // console.log(token.access_token);
        });
      }, 1800 * POLL_INTERVAL);
    })
    .catch(() => {
      dispatch(failedFetchingTokens());
    });
};
