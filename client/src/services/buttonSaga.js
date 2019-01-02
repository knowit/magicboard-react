// @flow
import {eventChannel} from 'redux-saga';
import {take, call, put} from 'redux-saga/effects';

const wsUrl = 'ws://localhost:4000';
const ws = new WebSocket(`${wsUrl}/button`);

let timer = true;

function buttonChannel() {
    return eventChannel(emitter => {
        // init the connection here


        ws.onopen = () => {
            ws.send('[client]: smart button');

            setInterval(
                () => console.log("ReadyState: ", ws.readyState),
                1000,
            );

            // Do your stuff...
        };


        ws.onmessage = (event: MessageEvent) => {

            // Not very pretty but works
            if (timer) {
                if (String(event.data).includes('1')) {
                    emitter({type: 'FACIAL_RECOGNITION_TOGGLED'});
                } else if (String(event.data).includes('2')) {
                    emitter({type: 'NEXT_BOARD'});
                } else if (String(event.data).includes('3')) {
                    emitter({type: 'PREVIOUS_BOARD'});
                } else {
                    emitter({type: 'UNKNOWN_BUTTON_PAYLOAD', payload: event.data});
                }
                timer = false;
                setTimeout(() => {
                timer = true}, 300);
            }
        };

        ws.onclose = () => {
            console.log("ButtonSage closed ");
        };


        return () => {
        };
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
