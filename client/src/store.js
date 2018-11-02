// @flow
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootSaga from './sagas';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

// TODO: Create middleware depending if build is in DEV or PROD
// createLogger() should not be ran in PROD
export const store = createStore(
  rootReducer,
  applyMiddleware(createLogger({}), sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
