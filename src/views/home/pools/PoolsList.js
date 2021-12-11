import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import {darkStyles} from '../../../components/Styles';
import PoolCard from './PoolCard';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';
import TokenManager from '../../../components/auth/TokenManager';
import config from '../../../store/config';

class PoolsList extends React.Component {
  state = {
    pools: [],
  };

  componentDidMount() {
    this.tabPressListener = this.props.navigation.addListener('focus', (e) => {
      this.props.route.params.changeDetailsOnTabPress('Schedine');
    });
    this.loadAllPools();
  }

  componentWillUnmount() {
    if (this.tabPressListener !== undefined) {
      this.tabPressListener();
    }
  }

  callUrl(url) {
    return TokenManager.getInstance().getToken().then(jwt => {
      return fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth": jwt,
        },
      })
    });
  };

  loadAllPools() {
    this.callUrl(config.API_URL + '/services/' + this.props.route.params.serviceData.id + '/pools')
      .then(e => e.json()
      .then(pools => {
        let last30dPools = pools._embedded.pools.filter(p => (new Date() - new Date(p.updatedOn)) <= (30 * 24 * 60 * 60 * 1000))
        this.setState({pools: last30dPools.sort((a,b) => b.createdOn - a.createdOn)});
      }))
  };

  renderItem = ({item, index}) => <PoolCard key={index} poolData={item} />;

  render() {
    const styles = darkStyles;
    return (
      <View style={{...styles.container, paddingTop: 30}}>
        {this.state.pools ? (
          <View>
            <FlatList
              data={this.state.pools}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => String(index)}
            />
          </View>
        ) : (
          <Text
            style={{
              margin: 30,
              marginBottom: 15,
              marginTop: 0,
              fontSize: 18,
              fontWeight: 'bold',
              color: '#555',
            }}>
            Nessuna schedina presente
          </Text>
        )}
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  headerImage: {width: 180, height: 40},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 30,
    padding: 15,
    marginHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  poolsContainer: {
    flex: 1,
    marginTop: 30,
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
export default connect(mapStateToProps, mapDispatchToProps)(PoolsList);
