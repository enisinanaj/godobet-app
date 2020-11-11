import {combineReducers} from 'redux';

import appReducer from './app.reducers.js';

export default combineReducers({
  app: appReducer,
});
