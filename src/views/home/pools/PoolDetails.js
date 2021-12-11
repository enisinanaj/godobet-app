import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import TokenManager from '../../../components/auth/TokenManager';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {darkStyles} from '../../../components/Styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';
import EventCard from '../events/EventCard';
import config from '../../../store/config';

const buttonStyle = {
  marginBotton: 30,
  height: 30,
  paddingHorizontal: 15,
  paddingVertical: 5,
  flexDirection: 'row',
  borderBottomWidth: 0,
  borderBottomColor: '#fff',
  marginTop: 20,
  marginBottom: 20,
  marginHorizontal: 10
}

class PoolDetails extends React.Component {
  state = {
    loading: true,
    eventsLoading: true,
    pool: {},
    events: [],
    motivationOpen: false
  };

  componentDidMount() {
    if (!this.props.route.params.poolData) {
      if (this.props.route.params.poolUrl) {
        this.getPoolDetails();
      } else {
        this.props.navigation.goBack();
      }
    } else {
      this.setPoolPropsToState();
    }
  }

  setPoolPropsToState() {
    this.setState({
      loading: false,
      eventsLoading: false,
      pool: this.props.route.params.poolData,
      events: this.props.route.params.poolData.events,
    });
  }

  async getPoolDetails() {
    var token = await TokenManager.getInstance().getToken();
    this.setState({loading: true, noErrors: true}, () => {
      try {
        fetch(this.props.route.params.poolUrl, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'X-Auth': token},
        })
          .then((response) => response.json())
          .then((response) => {
            if (response) {
              this.setState({
                loading: false,
                noErrors: true,
                pool: response,
              });
              this.getEvents(response._links.events.href);
            }
          });
      } catch (error) {
      }
    });
  }

  followTip() {
    this.postFollow(config.API_URL + `/played-pools/${this.props.app.user.userCode}/${this.state.pool.id}`)
    .then(() => Alert.alert("Tip seguita!"));
  }

  ignoreTip() {
    this.postFollow(config.API_URL + `/unplayed-pools/${this.props.app.user.userCode}/${this.state.pool.id}`)
    .then(() => Alert.alert("Tip ignorata!"));
  }

  postFollow(url) {
    return TokenManager.getInstance()
      .getToken()
      .then((jwt) => {
        return fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "X-Auth": jwt,
          },
          method: "POST",
        });
      })
      .then(() => {
        this.setState({pool: {
          ...this.state.pool,
          type: 'followed'
        }})
      });
  };

  async getEvents(url) {
    var token = await TokenManager.getInstance().getToken();
    this.setState({eventsLoading: true, eventsNoErrors: true}, () => {
      try {
        fetch(url, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'X-Auth': token},
        })
          .then((response) => response.json())
          .then((response) => {
            if (response._embedded) {
              this.setState({
                eventsLoading: false,
                eventsNoErrors: false,
                events: response._embedded.events,
              });
            }
          });
      } catch (error) {
        console.log(JSON.stringify(error, null, 2));
      }
    });
  }

  renderItem = ({item, index}) => <EventCard key={index} eventData={item} />;

  renderEventLoadingItem = ({item, index}) => (
    <View>
      <EventCard key={1} />
      <EventCard key={2} />
      <EventCard key={3} />
      <EventCard key={4} />
      <EventCard key={5} />
    </View>
  );

  render() {
    const styles = darkStyles;
    return (
      <View style={styles.container}>
        <View style={{...styles.poolDetails, paddingBottom: 5}}>
          {!this.state.loading ? (
            <View>
              <Text style={styles.title}>{this.state.pool.description}</Text>
              <View style={localStyles.mainInfoItems}>
                <View style={localStyles.col}>
                  <View style={localStyles.row}>
                    <Icon name="book-outline" size={18} type="ionicon" color={styles.icon.color} />
                    <Text style={localStyles.label}>
                      BOOKMAKER
                    </Text>
                  </View>
                  <Text style={localStyles.value}>
                    {this.state.pool.bookmaker}
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
                    {(this.state.pool.stake/100).toLocaleString("it-IT", {maximumFractionDigits: 2, minimumFractionDigits: 2})}%
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
                      {this.state.pool.totalQuote.toLocaleString("it-IT", {maximumFractionDigits: 2, minimumFractionDigits: 2})}
                  </Text>
                </View>
              </View>
              <View
                style={localStyles.serviceContainer}>
                <View style={localStyles.col}>
                  <View style={localStyles.row}>
                    <Text style={{...styles.text14, ...styles.bold }}>
                      SERVIZIO
                    </Text>
                  </View>
                  <Text style={{...localStyles.value, width: 210, height: 40}} numberOfLines={2} ellipsizeMode={'tail'}>
                    {this.state.pool.service.serviceName}
                  </Text>
                </View>
                <View style={{...localStyles.col, marginTop: 0}}>
                  <View style={localStyles.row}>
                    <Icon
                      name="trophy-outline"
                      type="ionicon"
                      size={18}
                      color={styles.icon.color}
                    />
                    <Text style={localStyles.label} numberOfLines={2}>
                      PROFITTO
                    </Text>
                  </View>
                  <Text style={[localStyles.value, {textAlign: 'right', height: 40, color: this.state.pool.profit >= 0 ? styles.primaryColor.color : '#800' }]}>
                    {this.state.pool.outcome} {this.state.pool.profit.toLocaleString("it-IT", {maximumFractionDigits: 2, minimumFractionDigits: 2})}
                  </Text>
                </View>
              </View>
              <View
                style={localStyles.serviceContainer}>
                {this.state.pool.motivation ? <View style={localStyles.col}>
                  <View style={localStyles.paddedRow}>
                    <Icon
                      name="reorder-four-outline"
                      type="ionicon"
                      size={18}
                      color={styles.icon.color}
                    />
                    <Text style={localStyles.label}>
                      MOTIVAZIONE
                    </Text>
                  </View>
                  
                  {this.state.pool.motivation && this.state.motivationOpen && <Text style={styles.text14}>
                    {this.state.pool.motivation}
                  </Text>}
                  {this.state.pool.motivation && !this.state.motivationOpen && <Text 
                    ellipsizeMode={'tail'} numberOfLines={5}
                    style={{...styles.text14}}>
                    {this.state.pool.motivation}
                  </Text>}
                  {this.state.motivationOpen && 
                    <TouchableOpacity onPress={() => this.setState({motivationOpen: !this.state.motivationOpen})} 
                      style={{padding: 10}}>
                      <Icon
                        size={16}
                        name="chevron-up-circle-outline"
                        type="ionicon"
                        color={styles.icon.color}
                      />
                  </TouchableOpacity>}
                  {this.state.pool.motivation && !this.state.motivationOpen && 
                    <TouchableOpacity onPress={() => this.setState({motivationOpen: !this.state.motivationOpen})}
                      style={{padding: 10}}>
                      <Icon
                        size={16}
                        name="chevron-down-circle-outline"
                        type="ionicon"
                        color={styles.icon.color}
                      />
                  </TouchableOpacity>}
                </View>
                : null}
              </View>
            </View>
          ) : (
            <View>
              <ContentLoader
                height={150}
                speed={1}
                backgroundColor={'#DDD'}
                foregroundColor={'#FFF'}>
                {/* Only SVG shapes */}
                <Rect x="-180" y="0" rx="5" ry="5" width="100%" height="35" />

                <Rect x="-200" y="70" rx="4" ry="4" width="100%" height="25" />
                <Rect x="250" y="70" rx="4" ry="4" width="100%" height="25" />
                <Rect x="-280" y="130" rx="4" ry="4" width="100%" height="25" />
                <Rect x="280" y="130" rx="4" ry="4" width="100%" height="25" />

                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}></Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}>
                  <View style={localStyles.col}>
                    <View style={localStyles.row}>
                      <Icon name="book-outline" type="ionicon" color="#555" />
                      <Text style={{...styles.text18, marginLeft: 10}}>
                        Bookmaker
                      </Text>
                    </View>
                    <Text style={{...styles.text18, ...styles.bold}}></Text>
                  </View>
                  <View style={localStyles.col}>
                    <View style={localStyles.row}>
                      <Icon
                        name="analytics-outline"
                        type="ionicon"
                        color="#555"
                      />
                      <Text style={{...styles.text18, marginLeft: 10}}>
                        Quota
                      </Text>
                    </View>
                    <Text
                      style={{
                        ...styles.text18,
                        ...styles.bold,
                        textAlign: 'right',
                      }}></Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}>
                  <View style={localStyles.col}>
                    <View style={localStyles.row}>
                      <Icon
                        name="pie-chart-outline"
                        type="ionicon"
                        color="#555"
                      />
                      <Text style={{...styles.text18, marginLeft: 10}}>
                        Stake
                      </Text>
                    </View>
                    <Text style={{...styles.text18, ...styles.bold}}></Text>
                  </View>
                  <View style={localStyles.col}>
                    <View style={localStyles.row}>
                      <Icon name="trophy-outline" type="ionicon" color="#555" />
                      <Text style={{...styles.text18, marginLeft: 10}}>
                        Profitto
                      </Text>
                    </View>
                    <Text
                      style={{
                        ...styles.text18,
                        ...styles.bold,
                        textAlign: 'right',
                      }}></Text>
                  </View>
                </View>
              </ContentLoader>
            </View>
          )}
        </View>
        <View style={styles.container}>
          {!this.state.eventsLoading && this.state.events.length === 0 ? (
            <Text style={styles.menuText}>Nessun evento presente</Text>
          ) : (
            <View style={{flex: 1}}>
              <Text style={styles.menuText}>Eventi</Text>
              <FlatList
                data={this.state.events}
                renderItem={this.renderItem}
                ListEmptyComponent={this.renderEventLoadingItem}
                keyExtractor={(item, index) => String(index)}
              />
              {this.state.pool.type === 'ongoing' && <View
                style={localStyles.votingContainer}>
                <TouchableOpacity style={buttonStyle} onPress={() => this.followTip()} >
                  <Icon name="checkmark-outline"
                    type="ionicon"
                    size={18}
                    color={'#FFF'}
                    style={{marginRight: 5}} />
                  <Text style={{...styles.text18, color: '#FFF', ...styles.bold}}>
                    Segui
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={buttonStyle} onPress={() => this.ignoreTip()}>
                  <Icon name="close-outline"
                    type="ionicon"
                    size={18}
                    color={'#FFF'}
                    style={{marginRight: 5}} />
                  <Text style={{...styles.text18, color: '#FFF', ...styles.bold}}>
                    Ignora
                  </Text>
                </TouchableOpacity>
              </View>}
            </View>
          )}
        </View>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  mainInfoItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
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
  }
})

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(PoolDetails);
