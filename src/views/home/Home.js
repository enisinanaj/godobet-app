import React from 'react';
import {
  View,
} from 'react-native';

import { normalizeUrl } from '../../components/Utils';
import messaging from '@react-native-firebase/messaging';
import TokenManager from '../../components/auth/TokenManager';
import {darkStyles} from '../../components/Styles';
import PoolStories from './pools/PoolStories';
import ServicesList from './services/ServicesList';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../store/actions/actions';

const loadAllPools = (url, args = {}) => {
  return TokenManager.getInstance()
    .getToken()
    .then((jwt) => {
      return fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth": jwt,
        },
        ...args,
      })
        .then((e) => e.json())
        .then((json) =>
          json._embedded && json._embedded.pools
            ? json._embedded.pools
            : json._embedded && json._embedded.playedPools
            ? json._embedded.playedPools
            : []
        );
    });
};

class Home extends React.Component {
  state = {
    subscriptions: [],
    pools: [],
  };

  componentDidMount() {
    this.handleNotificationOnOpenedApp();
    this.handleInitialNotification();
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

  async getMySubscriptions() {
    var token = await TokenManager.getInstance().getToken();
    this.setState(
      {loading: true, noErrors: true, pools: [], subscriptions: []},
      () => {
        fetch(normalizeUrl(this.props.app.user._links.subscriptions.href), {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'X-Auth': token},
        })
          .then((response) => response.json())
          .then((response) => {
            if (response._embedded) {
              this.setState({
                loading: false,
                noErrors: true,
                subscriptions: response._embedded.subscriptions.filter(sub => sub.valid && !sub.expired && sub.paymentSystemToken !== 'self'),
              });
            }
          })
          .catch(error => console.warn(error));
      },
    );
  }

  render() {
    const styles = darkStyles;
    return (
      <View style={styles.container}>
        <PoolStories pools={this.state.ongoingPools} />
        <ServicesList
          subscriptions={this.state.subscriptions}
          loaded={!this.state.loading}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
