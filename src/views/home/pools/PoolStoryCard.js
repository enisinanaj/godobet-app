import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {lightStyles, darkStyles} from '../../../components/Styles';
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

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(PoolStoryCard);
