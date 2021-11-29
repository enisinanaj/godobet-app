import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './src/store/actions/actions';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/components/Routes';
import HomeStackRef from './src/components/HomeStackRef';
import {Appearance, useColorScheme} from 'react-native-appearance';
import {lightStyles, darkStyles} from './src/components/Styles';

class App extends React.Component {
  componentDidMount() {
    this.setColorTheme();
    this.appearanceListener = Appearance.addChangeListener(({colorScheme}) => {
      this.setColorTheme();
    });
  }

  setColorTheme() {
    if (this.props.theme.mode === 'device')
      this.props.actions.appTheme(this.props.theme.mode);
  }

  render() {
    const styles =
      this.props.theme.currentTheme === 'dark' ? darkStyles : lightStyles;
    return (
      <NavigationContainer
        ref={(nav) => {
          if (nav != null) HomeStackRef.setRef(nav);
        }}>
        <StatusBar
          backgroundColor={styles.headerBackground.backgroundColor}
          barStyle={
            this.props.theme.currentTheme === 'dark'
              ? 'light-content'
              : 'dark-content'
          }
        />
        <View style={styles.container}>
          <Routes props={this.props} />
        </View>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
