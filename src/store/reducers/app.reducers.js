import {USER_LOGIN} from '../actions/actions';

const initialState = {
  user: undefined,
  loggedIn: false,
};

const appReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.user,
        loggedIn: !!action.user,
      };
    default:
      return state;
  }
};

export default appReducers;
