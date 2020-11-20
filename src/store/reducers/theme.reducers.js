import {APP_THEME} from '../actions/actions';
import {Appearance, useColorScheme} from 'react-native-appearance';

const initialState = {
  mode: 'device',
  currentTheme: undefined,
};

function selectTheme(theme) {
  switch (theme) {
    case 'device':
      if (Appearance.getColorScheme() === 'dark') return 'dark';
      else return 'light';
    case 'dark':
      return 'dark';
    case 'light':
      return 'light';
    default:
      return 'light';
  }
}

const themeReducers = (state = initialState, action) => {
  switch (action.type) {
    case APP_THEME:
      return {
        ...state,
        mode: action.theme,
        currentTheme: selectTheme(action.theme),
      };
    default:
      return state;
  }
};

export default themeReducers;
