import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension'

import logger from 'redux-logger';

import rootReducer from './root-reducer'

const middleware = [ logger ]

export const store = createStore( rootReducer, composeWithDevTools(applyMiddleware( ...middleware )));

export default store;