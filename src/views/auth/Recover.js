import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import config from '../../store/config';
import auth from '@react-native-firebase/auth';
import TokenManager from '../../components/auth/TokenManager';
import {lightStyles, darkStyles} from '../../components/Styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../store/actions/actions';

class Recover extends React.Component {
  state = {
    email: '',
    recoverLoading: false,
    recoverError: '',
  };

  createAlert = () =>
    Alert.alert(
      'Email inviata',
      'Segui le istruzioni ricevute per email e riesegui il login',
      [{text: 'OK'}],
      {cancelable: false},
    );

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

  async recoverPassword() {
    await this.validateEmail(this.state.email);

    if (!this.state.emailError) {
      this.setState({recoverLoading: true});

      auth()
        .sendPasswordResetEmail(this.state.email)
        .then(() => {
          // Email sent.
          this.setState({
            recoverError: '',
            recoverLoading: false,
          });
          this.createAlert();
        })
        .catch((error) => {
          // An error happened.
          this.setState({recoverError: error.message, recoverLoading: false});
        });
    }
  }

  render() {
    const styles =
      this.props.theme.currentTheme === 'dark' ? darkStyles : lightStyles;
    return (
      <View style={{...styles.container, padding: 30, alignItems: 'center'}}>
        <Text style={{...styles.text18, textAlign: 'center'}}>
          Inserisci il tuo indirizzo email per ricevere le istruzioni su come
          reimpostare il tuo account
        </Text>
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

        <TouchableOpacity
          style={{...styles.button, backgroundColor: '#d9534f'}}
          disabled={this.state.recoverLoading}
          onPress={() => this.recoverPassword()}>
          {this.state.recoverLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={{fontSize: 18, color: '#FFF'}}>Invia</Text>
          )}
        </TouchableOpacity>

        <View style={{alignItems: 'flex-start', width: '100%'}}>
          <Text
            style={{color: 'red', fontSize: 14, margin: 10, marginBottom: 0}}>
            {this.state.recoverError}
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
export default connect(mapStateToProps, mapDispatchToProps)(Recover);
