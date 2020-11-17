import React from 'react';
import {View, Image} from 'react-native';

import Login from '../views/auth/Login';
import Recover from '../views/auth/Recover';
import Profile from '../views/profile/Profile';
import Home from '../views/home/Home';
import ServiceDetails from '../views/home/services/ServiceDetails';
import PoolDetails from '../views/home/pools/PoolDetails';

import {createStackNavigator} from '@react-navigation/stack';

const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();

const Routes = ({app}) => {
  if (!app.loggedIn) {
    return (
      <LoginStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitle: (
            <View>
              <Image
                style={{width: 160, height: 40}}
                resizeMode="contain"
                source={require('../../assets/images/godobet_logo.png')}
              />
            </View>
          ),
        }}>
        <LoginStack.Screen name="Login" component={Login} />
        <LoginStack.Screen name="Recover" component={Recover} />
      </LoginStack.Navigator>
    );
  } else {
    return (
      <HomeStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitle: (
            <View>
              <Image
                style={{width: 160, height: 40}}
                resizeMode="contain"
                source={require('../../assets/images/godobet_logo.png')}
              />
            </View>
          ),
        }}>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="ServiceDetails" component={ServiceDetails} />
        <HomeStack.Screen name="PoolDetails" component={PoolDetails} />
      </HomeStack.Navigator>
    );
  }
};

export default Routes;
