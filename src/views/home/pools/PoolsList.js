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
import config from '../../../store/config';
import auth from '@react-native-firebase/auth';
import TokenManager from '../../../components/auth/TokenManager';
import ContentLoader, {Rect} from 'react-content-loader/native';
import HomeStackRef from '../../../components/HomeStackRef';
import PoolCard from './PoolCard';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';

class PoolsList extends React.Component {
  componentDidMount() {
    this.tabPressListener = this.props.navigation.addListener('focus', (e) => {
      this.props.route.params.changeDetailsOnTabPress('Schedine');
    });
  }

  componentWillUnmount() {
    if (this.tabPressListener !== undefined) {
      this.tabPressListener();
    }
  }

  renderItem = ({item, index}) => <PoolCard key={index} poolData={item} />;
  render() {
    return (
      <View style={styles.poolsContainer}>
        {this.props.route.params.pools ? (
          <View>
            <FlatList
              data={this.props.route.params.pools}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => String(index)}
            />
          </View>
        ) : (
          <Text
            style={{
              margin: 30,
              marginTop: 15,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Nessuna schedina presente
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
