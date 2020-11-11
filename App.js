import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/components/Routes';

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar />
        <Routes app={this.props.app} />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(App);
