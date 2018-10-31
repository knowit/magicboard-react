// @flow
import { eventChannel } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';

const wsUrl = 'ws://localhost:4000';

function buttonChannel() {
  return eventChannel(emitter => {
    // init the connection here
    const ws = new WebSocket(`${wsUrl}/button`);

    ws.onopen = () => {
      ws.send('[client]: smart button');
    };

    ws.onmessage = (event: MessageEvent) => {
      if (event.data === '1') {
        emitter({ type: 'FACIAL_RECOGNITION_TOGGLED' });
      } else if (event.data === '2') {
        emitter({ type: 'NEXT_BOARD' });
      } else if (event.data === '3') {
        emitter({ type: 'PREVIOUS_BOARD' });
      } else {
        emitter({ type: 'UNKNOWN_BUTTON_PAYLOAD', payload: event.data });
      }
    };

    return () => {};
  });
}

function* buttonSaga(): Generator<*, *, *> {
  const channel = yield call(buttonChannel);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default [buttonSaga];
