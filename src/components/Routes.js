import React from 'react';
import {View, Text} from 'react-native';
import Login from '../views/auth/Login';
import Recover from '../views/auth/Recover';
import SignoutTest from '../views/auth/SignoutTest';

import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();

const Routes = ({app}) => {
  if (!app.loggedIn) {
    return (
      <LoginStack.Navigator initialRouteName="Login">
        <LoginStack.Screen name="Login" component={Login} />
        <LoginStack.Screen name="Recover" component={Recover} />
      </LoginStack.Navigator>
    );
  } else {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Signout" component={SignoutTest} />
      </HomeStack.Navigator>
    );
  }
};

export default Routes;
