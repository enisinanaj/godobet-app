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
import ContentLoader, {Rect} from 'react-content-loader/native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../store/actions/actions';

class PoolCard extends React.Component {
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
    if (this.state.loading)
      return (
        <View style={styles.container}>
          <ContentLoader
            height={60}
            speed={1}
            backgroundColor={'#CCC'}
            foregroundColor={'#FFF'}
            viewBox="0 0 380 380">
            {/* Only SVG shapes */}
            <Rect x="0" y="0" rx="5" ry="5" width="100%" height="200" />
            <Rect x="0" y="260" rx="5" ry="5" width="100%" height="150" />
          </ContentLoader>
        </View>
      );
    else
      return (
        <View style={{...styles.container, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              paddingBottom: 10,
              borderBottomWidth: 0.5,
            }}>
            #{this.props.poolData.id}
          </Text>
          <Text style={{paddingTop: 10, fontSize: 20}}>
            {this.props.poolData.events.length}{' '}
            {this.props.poolData.events.length === 1 ? 'evento' : 'eventi'}
          </Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  headerImage: {width: 180, height: 40},
  container: {
    minWidth: 80,
    backgroundColor: '#EEE',
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
export default connect(mapStateToProps, mapDispatchToProps)(PoolCard);
