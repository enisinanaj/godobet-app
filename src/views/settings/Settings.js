import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {darkStyles} from '../../components/Styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../store/actions/actions';

class Settings extends React.Component {
  state = {
    email: '',
    password: '',
    loginLoading: false,
    loginError: '',
  };

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  logout() {
    auth()
      .signOut()
      .then((e) => {
        this.props.actions.userLogin(undefined);
      });
  }

  setTheme(theme) {
    this.props.actions.appTheme(theme);
  }

  getThemeMode() {
    const mode = this.props.theme.mode;
    switch (mode) {
      case 'device':
        return 'Tema del telefono';
      case 'light':
        return 'Chiaro';
      case 'dark':
        return 'Scuro';
      default:
        return 'Chiaro';
    }
  }

  render() {
    const styles = darkStyles;
    return (
      <View style={{...styles.container}}>
        <Text style={{...styles.menuText}}>Impostazioni</Text>
        <TouchableOpacity
          style={{
            ...styles.cardContainer,
            padding: 15,
            alignItems: 'center',
          }}
          onPress={() => this.logout()}>
          <Text style={{...styles.text18, ...styles.bold}}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  headerImage: {width: 180, height: 40},
  container: {
    flex: 1,
    padding: 30,
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
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
