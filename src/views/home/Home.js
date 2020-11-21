import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Appearance,
  ActivityIndicator,
} from 'react-native';

import config from '../../store/config';
import messaging from '@react-native-firebase/messaging';
import TokenManager from '../../components/auth/TokenManager';
import {lightStyles, darkStyles} from '../../components/Styles';
import PoolStories from './pools/PoolStories';
import ServicesList from './services/ServicesList';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../store/actions/actions';

class Home extends React.Component {
  state = {
    subscriptions: [],
    pools: [],
  };

  componentDidMount() {
    this.handleNotificationOnOpenedApp();
    this.handleInitialNotification();
    // console.log(JSON.stringify(this.props.app.user._links, null, 2));
    this.getMySubscriptions();
  }

  handleNotificationOnOpenedApp() {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      this.handleNotification(remoteMessage);
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });
  }

  handleInitialNotification() {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          this.handleNotification(remoteMessage);
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });
  }

  handleNotification(notification) {
    if (notification.data && notification.data.type)
      switch (notification.data.type) {
        case 'newPool':
          this.props.navigation.push('PoolDetails', {
            poolUrl: notification.data.poolUrl,
          });
          break;
        default:
          break;
      }
  }

  async testNewSubscriber() {
    const newSubscription = {
      subscriber: 'https://godobet-api.herokuapp.com/users/6',
      service: 'https://godobet-api.herokuapp.com/services/42',
      paymentSystemToken: 'test',
      subscribedOn: new Date(),
      lastCharge: new Date(),
    };

    var token = await TokenManager.getInstance().getToken();
    fetch('https://godobet-api.herokuapp.com/subscriptions', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'X-Auth': token},
      body: JSON.stringify(newSubscription),
    }).then((response) => {
      console.log(response);
      response.json();
    });
  }

  async testPacchetti() {
    var token = await TokenManager.getInstance().getToken();
    this.setState({loading: true, noErrors: true}, () => {
      try {
        fetch('https://godobet-api.herokuapp.com/subscriptions/104/services', {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'X-Auth': token},
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
          });
      } catch {
        console.log(this.props.app);
        // this.props.history.push("/login");
      }
    });
  }

  addPoolsToState(pools) {
    let joinedPools = [...this.state.pools, ...pools];
    this.setState({pools: joinedPools});
  }

  async getMySubscriptions() {
    //this.props.app.user._links.subscriptions.href
    //console.log(JSON.stringify(this.props.app.user, null, 2));
    var token = await TokenManager.getInstance().getToken();
    this.setState(
      {loading: true, noErrors: true, pools: [], subscriptions: []},
      () => {
        try {
          fetch(this.props.app.user._links.subscriptions.href, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'X-Auth': token},
          })
            .then((response) => response.json())
            .then((response) => {
              if (response._embedded) {
                this.setState({
                  loading: false,
                  noErrors: true,
                  subscriptions: response._embedded.subscriptions,
                });
              }
            });
        } catch (error) {
          console.log(error);
        }
      },
    );
  }

  render() {
    const styles =
      this.props.theme.currentTheme === 'dark' ? darkStyles : lightStyles;
    return (
      <View style={styles.container}>
        <PoolStories pools={this.state.pools} />
        <ServicesList
          subscriptions={this.state.subscriptions}
          addPoolsToState={(pools) => this.addPoolsToState(pools)}
        />
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  headerImage: {width: 180, height: 40},
  container: {
    flex: 1,
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
