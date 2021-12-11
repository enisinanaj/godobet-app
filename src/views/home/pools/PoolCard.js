import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {lightStyles, darkStyles} from '../../../components/Styles';
import HomeStackRef from '../../../components/HomeStackRef';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';

class PoolCard extends React.Component {
  componentDidMount() {
    //console.log(JSON.stringify(this.props.poolData, null, 2));
  }

  render() {
    const styles = darkStyles;
    const pool = this.props.poolData;

    return (
      <TouchableOpacity
        style={styles.serviceCardContainer}
        onPress={() =>
          HomeStackRef.getRef().navigate('PoolDetails', {
            poolData: this.props.poolData,
          })
        }>
        <View>
          <View style={[localStyles.row, { justifyContent: 'space-between' }]}>
            <Text style={styles.title}>{pool.description}</Text>
            {pool.outcome ? <Text style={[styles.title, {
              color: pool.profit >= 0 ? styles.primaryColor.color : "#800"
            }]}>{pool.outcome} ({pool.profit.toLocaleString("it-IT", {minimumFractionDigits: 2, maximumFractionDigits: 2})}%)</Text> : null}
          </View>
          <View style={localStyles.mainInfoItems}>
            <View style={localStyles.col}>
              <View style={localStyles.row}>
                <Icon name="book-outline" size={18} type="ionicon" color={styles.icon.color} />
                <Text style={localStyles.label}>
                  BOOKMAKER
                </Text>
              </View>
              <Text style={localStyles.value}>
                {pool.bookmaker}
              </Text>
            </View>
            <View style={localStyles.col}>
              <View style={localStyles.row}>
                <Icon
                  name="pie-chart-outline"
                  type="ionicon"
                  size={18}
                  color={styles.icon.color}
                />
                <Text style={localStyles.label}>
                  STAKE
                </Text>
              </View>
              <Text style={localStyles.value}>
                {(pool.stake/100).toLocaleString("it-IT", {maximumFractionDigits: 2, minimumFractionDigits: 2})}%
              </Text>
            </View>
            <View style={localStyles.col}>
              <View style={localStyles.row}>
                <Icon
                  name="at-outline"
                  type="ionicon"
                  size={18}
                  color={styles.icon.color}
                />
                <Text style={localStyles.label}>
                  QUOTA
                </Text>
              </View>
              <Text style={[localStyles.value, {textAlign: 'right'}]}>
                  {pool.totalQuote.toLocaleString("it-IT", {maximumFractionDigits: 2, minimumFractionDigits: 2})}
              </Text>
            </View>
          </View>
          <Text style={[localStyles.label, {marginTop: 5, marginLeft: 0}]}>
            EVENTI
          </Text>
          {
            this.props.poolData.events.map(e => {
              return (      
                <View style={localStyles.eventRow}>
                  <View style={{flex: 1}}>
                    <Text style={localStyles.competition}>
                      {e.competition}
                    </Text>
                    <Text style={localStyles.event}>
                      {e.event}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 8}}>
                    <View>
                      <Text style={localStyles.labelTitle} >
                        QUOTA
                      </Text>
                      <Text style={localStyles.smallValue}>
                        {(e.quote/100).toLocaleString("it-IT", {maximumFractionDigits: 2, minimumFractionDigits: 2})}
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text style={localStyles.labelTitle} >
                        PROPOSTA
                      </Text>
                      <Text style={localStyles.smallValue}>
                        {e.proposal}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
      </TouchableOpacity>
    );
  }
}

const localStyles = StyleSheet.create({
  mainInfoItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 10
  },

  label: {
    ...darkStyles.text14, 
    ...darkStyles.bold, 
    marginLeft: 5
  },

  value: {
    ...darkStyles.text18,
    marginTop: 5
  },

  col: {
    flexDirection: 'column'
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 15
  },

  paddedRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingBottom: 5
  },

  votingContainer: {
    ...darkStyles.poolDetails,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: 0,
    paddingBottom: 25,
    marginTop: 5
  },

  competition: {
    textAlign: 'left',
    ...darkStyles.text14,
    fontWeight: 'bold',
    paddingBottom: 5,
  },

  event: {
    textAlign: 'left',
    ...darkStyles.text14,
    fontWeight: 'bold',
  },

  eventRow: {
    paddingVertical: 5,
    marginTop: 10,
    borderLeftWidth: 2,
    borderLeftColor: darkStyles.primaryColorTransparency.color,
    paddingLeft: 10
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
  }
})

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(PoolCard);
