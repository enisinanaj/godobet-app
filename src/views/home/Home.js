import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import config from '../../store/config';
import auth from '@react-native-firebase/auth';
import TokenManager from '../../components/auth/TokenManager';

import PoolStories from './PoolStories';
import ServicesList from './ServicesList';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../store/actions/actions';

class Home extends React.Component {
  state = {
    subscriptions: [],
    pools: [],
  };

  componentDidMount() {
    // console.log(JSON.stringify(this.props.app.user._links, null, 2));
    this.getMySubscriptions();
    //this.testPacchetti();
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
    const joinedPools = this.state.pools.concat(pools);
    this.setState({pools: joinedPools});
  }

  async getMySubscriptions() {
    //this.props.app.user._links.subscriptions.href
    //console.log(JSON.stringify(this.props.app.user, null, 2));
    var token = await TokenManager.getInstance().getToken();
    this.setState({loading: true, noErrors: true}, () => {
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
    });
  }

  render() {
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

const styles = StyleSheet.create({
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
