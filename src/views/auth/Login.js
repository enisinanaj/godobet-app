import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Icon} from 'react-native-elements';
import config from '../../store/config';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import TokenManager from '../../components/auth/TokenManager';
import {lightStyles, darkStyles} from '../../components/Styles';
import DeviceInfo from 'react-native-device-info';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../store/actions/actions';

class Login extends React.Component {
  state = {
    email: 'kconhe@gmail.com',
    password: '12688ab:',
    loginLoading: false,
    loginError: '',
  };

  async requestUserPermissionNotifications() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  }

  async checkUserDevices(userData) {
    const gotPermission = await this.requestUserPermissionNotifications();
    if (gotPermission) {
      const notificationToken = await this.getNotificationToken();
      var token = await TokenManager.getInstance().getToken();
      try {
        fetch(userData._links.devices.href, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'X-Auth': token},
        })
          .then((response) => response.json())
          .then((response) => {
            this.checkDevicesList(
              userData,
              notificationToken,
              response._embedded.devices,
            );
          });
      } catch {
        this.setState({
          loginError:
            'Errore! Non sono riuscito a prendere la lista dei tuoi dispositivi',
        });
      }
    } else {
      this.props.actions.userLogin(userData);
    }
  }

  async checkDevicesList(userData, notificationToken, devicesList) {
    const tokenExists = devicesList.find(
      (device) => device.deviceToken === notificationToken,
    );

    if (tokenExists) {
      this.props.actions.userLogin(userData);
    } else {
      this.addNewDevice(userData, notificationToken);
    }
  }

  async addNewDevice(userData, notificationToken) {
    const device = {
      deviceToken: notificationToken,
      make: DeviceInfo.getBrand(),
      build: DeviceInfo.getVersion(),
      deviceName: DeviceInfo.getDeviceNameSync(),
      owner: userData._links.self.href,
    };
    //console.log(JSON.stringify(device, null, 2));
    var token = await TokenManager.getInstance().getToken();
    fetch(config.API_URL + '/devices', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'X-Auth': token},
      body: JSON.stringify(device),
    })
      .then((response) => {
        this.props.actions.userLogin(userData);
      })
      .catch((error) => {
        console.warn(error);
        this.setState({
          loginError: 'Errore! Non sono riuscito a salvare il tuo dispositivo',
        });
      });
  }

  async getNotificationToken() {
    //await messaging().registerDeviceForRemoteMessages()
    if (Platform.OS === 'android') {
      return await messaging().getToken();
    } else if (Platform.OS === 'ios') {
      return await messaging().getAPNSToken();
    } 
  }

  async validateEmail(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      //not correct
      this.setState({email: email, emailError: true});
      return false;
    } else {
      //correct
      this.setState({email: email, emailError: false});
    }
  }

  async validatePassword(password) {
    if (password === '') {
      //not correct
      this.setState({password: password, passwordError: true});
      return false;
    } else {
      //correct
      this.setState({password: password, passwordError: false});
    }
  }

  async loginWithEmail() {
    await this.validateEmail(this.state.email);
    await this.validatePassword(this.state.password);

    if (!this.state.emailError && !this.state.passwordError) {
      this.setState({loginLoading: true});
      auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {})
        .catch((e) => {
          this.setState({
            loginError: e.message,
            loginLoading: false,
          });
        });
      
      this.addUserStateChangeEvent();
    }
  }

  addUserStateChangeEvent = () => {
    auth().onAuthStateChanged((user) => {
      if (!user) {
        return;
      }

      TokenManager.getInstance()
        .getToken()
        .then((jwt) => {
          fetch(
            config.API_URL +
              '/users/search/findByAccessToken/?accessToken=' +
              user.uid,
            {
              headers: {
                'Content-Type': 'application/json',
                'X-Auth': jwt,
              },
            },
          )
            .then((e) => {
              return e.json()
            })
            .then((localUser) => {
              // this.checkUserDevices({
              this.props.actions.userLogin({
                ...user,
                ...localUser,
              });
            })
            .catch(e => console.warn(e));
        });

      //this.props.actions.userLogin(user);
    });
  };

  render() {
    const styles =
      this.props.theme.currentTheme === 'dark' ? darkStyles : lightStyles;
    return (
      <View style={{...styles.container, padding: 30, alignItems: 'center'}}>
        <Text style={styles.text18}>Accedi a GodoBet</Text>
        <View
          style={{
            ...styles.inputContainer,
            borderColor: !this.state.emailError ? '#AAA' : 'red',
            borderWidth: !this.state.emailError ? 0.5 : 1,
          }}>
          <TextInput
            keyboardType="email-address"
            style={styles.inputStyle}
            placeholderTextColor={'#AAA'}
            placeholder={'Email'}
            autoCorrect={false}
            value={this.state.email}
            onChangeText={(email) => this.validateEmail(email)}
          />
          <View style={{margin: 15}}>
            <Icon name="mail" type="ionicon" color={styles.icon.color} />
          </View>
        </View>
        {this.state.emailError && (
          <View style={{alignItems: 'flex-start', width: '100%'}}>
            <Text
              style={{color: 'red', fontSize: 14, margin: 10, marginBottom: 0}}>
              Inserisci un'email valida
            </Text>
          </View>
        )}
        <View
          style={{
            ...styles.inputContainer,
            borderColor: !this.state.passwordError ? '#AAA' : 'red',
            borderWidth: !this.state.passwordError ? 0.5 : 1,
          }}>
          <TextInput
            style={styles.inputStyle}
            placeholderTextColor={'#AAA'}
            placeholder={'Password'}
            autoCorrect={false}
            value={this.state.password}
            secureTextEntry
            onChangeText={(password) => this.validatePassword(password)}
          />
          <View style={{margin: 15}}>
            <Icon name="lock-closed" type="ionicon" color={styles.icon.color} />
          </View>
        </View>
        {this.state.passwordError && (
          <View style={{alignItems: 'flex-start', width: '100%'}}>
            <Text
              style={{color: 'red', fontSize: 14, margin: 10, marginBottom: 0}}>
              Inserisci la password
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          disabled={this.state.loginLoading}
          onPress={() => {
            //this.testDeviceInfo();
            this.loginWithEmail();
          }}>
          {this.state.loginLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={{fontSize: 18, color: '#FFF'}}>Login</Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            marginTop: 20,
          }}>
          <TouchableOpacity
            disabled={this.state.loginLoading}
            onPress={() => this.props.navigation.navigate('Recover')}>
            <Text style={{...styles.text16, textAlign: 'right'}}>
              Password dimenticata?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'flex-start', width: '100%'}}>
          <Text
            style={{color: 'red', fontSize: 14, margin: 10, marginBottom: 0}}>
            {this.state.loginError}
          </Text>
        </View>
        <View style={{marginTop: 30, alignItems: 'center'}}>
          <Text style={styles.text14}>© 2020 - GodoBet</Text>
          <Text style={styles.text14}>Powered by Newline Code</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
