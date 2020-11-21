import React from 'react';
import {
  View,
  Text,
  Appearance,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import config from '../../../store/config';
import {lightStyles, darkStyles} from '../../../components/Styles';
import TokenManager from '../../../components/auth/TokenManager';
import ContentLoader, {Rect} from 'react-content-loader/native';
import HomeStackRef from '../../../components/HomeStackRef';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';

class PoolCard extends React.Component {
  componentDidMount() {
    //console.log(JSON.stringify(this.props.poolData, null, 2));
  }
  render() {
    const styles =
      this.props.theme.currentTheme === 'dark' ? darkStyles : lightStyles;
    return (
      <TouchableOpacity
        style={styles.serviceCardContainer}
        onPress={() =>
          HomeStackRef.getRef().navigate('PoolDetails', {
            poolData: this.props.poolData,
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              ...styles.text20,
              fontWeight: 'bold',
            }}>
            {this.props.poolData.description}
          </Text>
          <Icon name="arrow-forward" type="ionicon" color={styles.icon.color} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 5,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="analytics-outline"
              type="ionicon"
              color={styles.icon.color}
            />
            <Text style={{...styles.text18, marginLeft: 10}}>
              Quota:{' '}
              <Text style={styles.bold}>{this.props.poolData.quote}€</Text>
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="pie-chart-outline"
              type="ionicon"
              color={styles.icon.color}
            />
            <Text style={{...styles.text18, marginLeft: 10}}>
              Stake:{' '}
              <Text style={styles.bold}>{this.props.poolData.stake}</Text>
            </Text>
          </View>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
          <Icon name="list-outline" type="ionicon" color={styles.icon.color} />
          <Text style={{...styles.text18, marginLeft: 10}}>
            {this.props.poolData.events.length}{' '}
            {this.props.poolData.events.length === 1 ? 'evento' : 'eventi'}
          </Text>
        </View>
      </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(PoolCard);
