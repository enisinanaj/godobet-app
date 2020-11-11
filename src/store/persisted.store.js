import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'godobetapp-store-key';

/* Use an IIFE to export the persisted state in a variable */
export const persistedState = (() => {
  try {
    const rawState = AsyncStorage.getItem(STORAGE_KEY);
    if (rawState === null) return undefined;
    const state = JSON.parse(rawState);
    //console.log(JSON.stringify(state, null, 2));
    return state;
  } catch (err) {
    return undefined;
  }
})();

/* Export a method to save state on each store update */
export const saveState = (state) => {
  try {
    let stateFilter = JSON.parse(JSON.stringify(state)); // deep clone
    const rawState = JSON.stringify(stateFilter);
    console.log(rawState);
    AsyncStorage.setItem(STORAGE_KEY, rawState);
  } catch (err) {
    // Ignore write errors.
  }
};
