import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/components/Routes';
import HomeStackRef from './src/components/HomeStackRef';

class App extends React.Component {
  componentDidMount() {
    console.warn(this.props.app);
  }

  render() {
    return (
      <NavigationContainer
        ref={(nav) => {
          if (nav != null) HomeStackRef.setRef(nav);
        }}>
        <StatusBar />
        <Routes app={this.props.app} />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(App);
