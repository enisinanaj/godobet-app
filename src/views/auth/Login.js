import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import config from '../../store/config';
import auth from '@react-native-firebase/auth';
import TokenManager from '../../components/auth/TokenManager';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../store/actions/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loginLoading: false,
    loginError: '',
  };

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
        .then((response) => {})
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
            .then((e) => e.json())
            .then((localUser) => {
              this.props.actions.userLogin({
                ...user,
                ...localUser,
              });
            });
        });

      //this.props.actions.userLogin(user);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 18}}>Accedi a GodoBet</Text>
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
          <View style={styles.iconViewStyle}>
            <Icon name="mail" type="ionicon" color="#555" />
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
          <View style={styles.iconViewStyle}>
            <Icon name="lock-closed" type="ionicon" color="#555" />
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
          style={styles.buttonStyle}
          disabled={this.state.loginLoading}
          onPress={() => this.loginWithEmail()}>
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
            onPress={() => this.props.navigation.navigate('Recover')}
            //onPress={() => this.loginWithEmail()}
          >
            <Text style={{fontSize: 16, textAlign: 'right'}}>
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
          <Text>© 2020 - GodoBet</Text>
          <Text>Powered by Newline Code</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerImage: {width: 180, height: 40},
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#AAA',
  },
  inputStyle: {
    flex: 1,
    height: 60,
    padding: 15,
    paddingRight: 0,
    fontSize: 18,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    width: '100%',
    height: 60,
    marginTop: 30,
    backgroundColor: '#24A0ED',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconViewStyle: {margin: 15},
});

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
