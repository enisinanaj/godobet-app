/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import configureStore from './src/store/store';
import {Provider} from 'react-redux';

const RNRedux = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);
