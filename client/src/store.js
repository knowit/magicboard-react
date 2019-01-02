// @flow
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootSaga from './sagas';
import  reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

// TODO: Create middleware depending if build is in DEV or PROD
// createLogger() should not be ran in PROD
export const store = createStore(
  reducers,
  applyMiddleware(createLogger({}), sagaMiddleware, thunkMiddleware),
);

sagaMiddleware.run(rootSaga);
