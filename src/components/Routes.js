import React from 'react';
import {View, Text} from 'react-native';
import Login from '../views/auth/Login';

import {createStackNavigator} from '@react-navigation/stack';

const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();

const Routes = ({app}) => {
  console.log(JSON.stringify(app, null, 2));
  if (!app.loggedIn) {
    return (
      <LoginStack.Navigator>
        <LoginStack.Screen name="Login" component={Login} />
      </LoginStack.Navigator>
    );
  } else {
    return (
      <View>
        <Text>Connesso</Text>
      </View>
    );
  }
};

export default Routes;
