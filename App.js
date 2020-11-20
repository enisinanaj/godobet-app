import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './src/store/actions/actions';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/components/Routes';
import HomeStackRef from './src/components/HomeStackRef';
import {Appearance, useColorScheme} from 'react-native-appearance';

class App extends React.Component {
  componentDidMount() {
    this.setColorTheme();
    this.appearanceListener = Appearance.addChangeListener(({colorScheme}) => {
      this.setColorTheme();
    });
    console.warn(this.props);
  }

  setColorTheme() {
    if (this.props.theme.mode === 'device')
      this.props.actions.appTheme(this.props.theme.mode);
  }

  render() {
    return (
      <NavigationContainer
        ref={(nav) => {
          if (nav != null) HomeStackRef.setRef(nav);
        }}>
        <StatusBar
          backgroundColor={
            this.props.theme.currentTheme === 'dark' ? '#222' : '#FFF'
          }
          barStyle={
            this.props.theme.currentTheme === 'dark'
              ? 'light-content'
              : 'dark-content'
          }
        />
        <Routes props={this.props} />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
