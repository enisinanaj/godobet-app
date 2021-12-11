import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
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
    const styles = darkStyles;
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
            borderWidth: 0.5,
            borderColor: this.props.poolData.type === 'ongoing' ? styles.primaryColor.color : '#CCC',
          }}
          onPress={() =>
            HomeStackRef.getRef().navigate('PoolDetails', {poolData: this.props.poolData})
          }>
          {
            this.props.poolData.events.map(e => {
              return (      
                <View style={{flex: 1}}>
                  <Text style={localStyles.competition}>
                    {e.competition.trim()}
                  </Text>
                  <Text style={localStyles.event}>
                    {e.event}
                  </Text>
                </View>
              )
            })
          }
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
            <View style={{flex: 1}}>
              <Text style={localStyles.labelTitle} >
                QUOTA
              </Text>
              <Text style={[localStyles.smallValue, {width: 85}]}>
                {this.props.poolData.totalQuote.toLocaleString("it-IT", {maximumFractionDigits: 2, minimumFractionDigits: 2})}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={localStyles.labelTitle} >
                STAKE
              </Text>
              <Text style={localStyles.smallValue}>
                {(this.props.poolData.stake/100).toLocaleString("it-IT", {maximumFractionDigits: 2, minimumFractionDigits: 2})}%
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 2}}>
            {this.props.poolData.events.length == 1 && <View style={{flex: 1}}>
              <Text style={localStyles.labelTitle} >
                PROPOSTA
              </Text>
              <Text style={[localStyles.smallValue, {width: 85}]} numberOfLines={1} ellipsizeMode={'tail'}>
                {this.props.poolData.events[0].proposal}
              </Text>
            </View>}
            {this.props.poolData.events.length > 1 && <View style={{flex: 1}}>
              <Text style={localStyles.labelTitle} >
              </Text>
              <Text style={localStyles.smallValue}>
                MULTIPLA
              </Text>
            </View>}
            {this.props.poolData.outcome ? <View style={{flex: 1}}>
              <Text style={localStyles.labelTitle} >
                PROFITTO
              </Text>
              <Text style={[localStyles.smallValue, {color: this.props.poolData.profit >= 0 ? styles.primaryColor.color : '#800'}]} numberOfLines={1} ellipsizeMode={'tail'}>
                {this.props.poolData.profit.toLocaleString("it-IT", {minimumFractionDigits: 2, maximumFractionDigits: 2})}%
              </Text>
            </View> : null}
          </View>
        </TouchableOpacity>
      );
  }
}

const localStyles = StyleSheet.create({
  competition: {
    width: 130,
    textAlign: 'left',
    ...darkStyles.text14,
    fontWeight: 'bold',
    paddingBottom: 5,
  },

  event: {
    width: 130,
    textAlign: 'left',
    ...darkStyles.text14,
    fontWeight: 'bold',
    paddingBottom: 5,
  },

  labelTitle: {
    textAlign: 'left',
    ...darkStyles.text9,
    marginBottom: 2,
  },

  smallValue: {
    width: '100%',
    textAlign: 'left',
    ...darkStyles.text14,
    fontWeight: 'bold',
    paddingBottom: 5,
  }
})

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(PoolStoryCard);
