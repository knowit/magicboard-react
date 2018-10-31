// @flow
import { all, fork } from 'redux-saga/effects';
import motionWebsocket from './services/motionSaga';
import buttonWebsocket from './services/buttonSaga';

function* root(): Generator<*, *, *> {
  yield all([...motionWebsocket.map(s => fork(s))]);
  yield all([...buttonWebsocket.map(s => fork(s))]);
}

export default root;
