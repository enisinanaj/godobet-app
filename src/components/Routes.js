import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import Login from '../views/auth/Login';
import Recover from '../views/auth/Recover';
import Home from '../views/home/Home';
import ServiceDetails from '../views/home/services/ServiceDetails';
import PoolDetails from '../views/home/pools/PoolDetails';
import Settings from '../views/settings/Settings';
import {lightStyles, darkStyles} from './Styles';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {createStackNavigator} from '@react-navigation/stack';
import HomeStackRef from './HomeStackRef';

const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();

const Routes = ({props}) => {
  const styles = props.theme.currentTheme === 'dark' ? darkStyles : lightStyles;
  if (!props.app.loggedIn) {
    return (
      <LoginStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: styles.headerBackground,
          headerTintColor: styles.headerTint.color,
          headerTitle: (
            <View>
              <Image
                style={{width: 160, height: 40}}
                resizeMode="contain"
                source={
                  props.theme.currentTheme === 'dark'
                    ? require('../../assets/images/godobet_logo_dark.png')
                    : require('../../assets/images/godobet_logo.png')
                }
              />
            </View>
          ),
        }}>
        <LoginStack.Screen name="Login" component={Login} />
        <LoginStack.Screen name="Recover" component={Recover} />
      </LoginStack.Navigator>
    );
  } else {
    let _menu = null;

    function setMenuRef(ref) {
      _menu = ref;
    }

    function hideMenu() {
      _menu.hide();
    }

    function showMenu() {
      _menu.show();
    }
    return (
      <HomeStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: styles.headerBackground,
          headerTintColor: styles.headerTint.color,
          headerTitle: (
            <View>
              <Image
                style={{width: 160, height: 40}}
                resizeMode="contain"
                source={
                  props.theme.currentTheme === 'dark'
                    ? require('../../assets/images/godobet_logo_dark.png')
                    : require('../../assets/images/godobet_logo.png')
                }
              />
            </View>
          ),
        }}>
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <Menu
                ref={setMenuRef}
                style={{...styles.headerBackground, marginTop: 15}}
                button={
                  <TouchableOpacity style={{padding: 15}} onPress={showMenu}>
                    <Icon
                      name="ellipsis-vertical"
                      type="ionicon"
                      color={styles.icon.color}
                    />
                  </TouchableOpacity>
                }>
                <MenuItem
                  textStyle={styles.text16}
                  onPress={() => {
                    hideMenu();
                    HomeStackRef.getRef().navigate('Settings');
                    //this.props.navigation.navigate('Settings');
                  }}>
                  Impostazioni
                </MenuItem>
              </Menu>
            ),
          }}
        />
        <HomeStack.Screen name="ServiceDetails" component={ServiceDetails} />
        <HomeStack.Screen name="PoolDetails" component={PoolDetails} />
        <HomeStack.Screen name="Settings" component={Settings} />
      </HomeStack.Navigator>
    );
  }
};

export default Routes;
