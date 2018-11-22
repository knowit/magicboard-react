// @flow
import {eventChannel} from 'redux-saga';
import {take, call, put} from 'redux-saga/effects';

let timer = true;
const wsUrl = 'ws://localhost:4000';

function motionChannel() {
    return eventChannel(emitter => {
        // init the connection here
        const ws = new WebSocket(`${wsUrl}/motion`);

        ws.onopen = () => {
            ws.send('[client]: motion sensor');
        };

        ws.onmessage = (event: MessageEvent) => {
            if (timer) {
                if (String(event.data).includes('0')) {
                    emitter({type: 'NO_MOTION_DETECTED'});
                } else if (
                    String(event.data)
                        .toString()
                        .includes('1')
                ) {
                    emitter({type: 'MOTION_DETECTED'});
                }
                timer = false;
                setTimeout(() => {
                    timer = true
                }, 300);
            }
        };

        return () => {
        };
    });
}

function* motionSaga(): Generator<*, *, *> {
    const channel = yield call(motionChannel);
    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}

export default [motionSaga];
