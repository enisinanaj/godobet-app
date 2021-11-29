import React from 'react';
import {
  View,
} from 'react-native';

import { normalizeUrl } from '../../components/Utils';
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

  addPoolsToState(pools) {
    let joinedPools = [...this.state.pools, ...pools];
    this.setState({pools: joinedPools});
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
                subscriptions: response._embedded.subscriptions,
              });
            }
          })
          .catch(error => console.warn(error));
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

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
