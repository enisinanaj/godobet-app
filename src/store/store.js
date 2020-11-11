import {createStore} from 'redux';
import reducers from './reducers/reducers';

import {persistedState, saveState} from './persisted.store';

export default function configureStore() {
  const saved = persistedState;
  console.log(saved);
  const store = createStore(
    reducers,
    persistedState,
    // second argument overrides the initial state
  );

  // add a listener that will be invoked on any state change
  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
}
