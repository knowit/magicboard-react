// @flow
import { all, fork } from 'redux-saga/effects';
import motionWebsocket from './services/motionSaga';
import buttonWebsocket from './services/buttonSaga';
import googleAssistantSage from './services/googleAssistantSaga';

function* root(): Generator<*, *, *> {
  yield all([...motionWebsocket.map(s => fork(s))]);
  yield all([...buttonWebsocket.map(s => fork(s))]);
  yield all([...googleAssistantSage.map(s => fork(s))]);
}

export default root;
