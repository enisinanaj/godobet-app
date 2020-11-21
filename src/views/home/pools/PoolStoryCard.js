import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Appearance,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import config from '../../../store/config';
import {lightStyles, darkStyles} from '../../../components/Styles';
import auth from '@react-native-firebase/auth';
import TokenManager from '../../../components/auth/TokenManager';
import ContentLoader, {Rect} from 'react-content-loader/native';
import HomeStackRef from '../../../components/HomeStackRef';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';

class PoolStoryCard extends React.Component {
  state = {
    loading: true,
    noError: true,
    service: {},
  };

  componentDidMount() {
    if (this.props.poolData) {
      this.setPoolLoaded();
    }
  }

  setPoolLoaded() {
    this.setState({loading: false});
  }

  render() {
    const styles =
      this.props.theme.currentTheme === 'dark' ? darkStyles : lightStyles;
    if (this.state.loading)
      return (
        <View style={styles.storiesCardContainer}>
          <ContentLoader
            height={60}
            speed={1}
            backgroundColor={'#CCC'}
            foregroundColor={'#FFF'}
            viewBox="0 0 380 380">
            {/* Only SVG shapes */}
            <Rect x="0" y="0" rx="5" ry="5" width="100%" height="200" />
            <Rect x="0" y="300" rx="5" ry="5" width="100%" height="180" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                paddingBottom: 10,
              }}></Text>
            <Text style={{paddingTop: 5, fontSize: 16}}></Text>
          </ContentLoader>
        </View>
      );
    else
      return (
        <TouchableOpacity
          style={{
            ...styles.storiesCardContainer,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: styles.primaryColor.color,
          }}
          onPress={() =>
            HomeStackRef.getRef().navigate('PoolDetails', {
              //poolUrl: 'https://godobet-api.herokuapp.com/pools/19',
              poolData: this.props.poolData,
            })
          }>
          <Text
            style={{
              textAlign: 'center',
              ...styles.text14,
              marginBottom: -5,
            }}>
            Quota
          </Text>
          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              ...styles.text18,
              fontWeight: 'bold',
              paddingBottom: 5,
            }}>
            {this.props.poolData.quote}€
          </Text>
          <Text style={styles.text16}>
            {this.props.poolData.events.length > 1 ? 'multipla' : 'singola'}
          </Text>
        </TouchableOpacity>
      );
  }
}

const styles2 = StyleSheet.create({
  headerImage: {width: 180, height: 40},
  container: {
    minWidth: 90,
    height: 90,
    backgroundColor: '#F0F0F0',
    padding: 15,
    marginTop: 15,
    marginBottom: 30,
    marginLeft: 30,
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
export default connect(mapStateToProps, mapDispatchToProps)(PoolStoryCard);
