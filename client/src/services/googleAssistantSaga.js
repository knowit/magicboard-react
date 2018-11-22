// @flow
import {eventChannel} from 'redux-saga';
import {take, call, put} from 'redux-saga/effects';

let timer = true;

const wsUrl = 'ws://localhost:4000';

function googleAssistantChannel() {
    return eventChannel(emitter => {
        // init the connection here
        const ws = new WebSocket(`${wsUrl}/googleAssistant`);

        ws.onopen = () => {
            ws.send('[client]: google assistant');
        };

        ws.onmessage = (event: MessageEvent) => {
            if (timer) {
                if (event.data === 'Next slide') {
                    console.log('Next slide ');
                    emitter({type: 'NEXT_BOARD'});
                } else if (event.data === 'Previous Slide') {
                    emitter({type: 'PREVIOUS_BOARD'});
                    timer = false;
                    setTimeout(() => {
                        timer = true
                    }, 300);
                }

            }
        };
        return () => {
        };
    });
}

function* googleAssistantSage(): Generator<*, *, *> {
    const channel = yield call(googleAssistantChannel);
    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}

export default [googleAssistantSage];
