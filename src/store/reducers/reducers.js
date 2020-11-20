import {combineReducers} from 'redux';

import appReducer from './app.reducers.js';
import themeReducer from './theme.reducers.js';

export default combineReducers({
  app: appReducer,
  theme: themeReducer,
});
