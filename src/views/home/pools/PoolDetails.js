import React from 'react';
import {
  View,
  Text,
  FlatList,
  Appearance,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import TokenManager from '../../../components/auth/TokenManager';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import PoolCard from '../pools/PoolCard';
import {lightStyles, darkStyles} from '../../../components/Styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';
import EventCard from '../events/EventCard';

class PoolDetails extends React.Component {
  state = {
    loading: true,
    eventsLoading: true,
    pool: {},
    events: [],
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
    //console.log(JSON.stringify(this.props.route.params.poolData, null, 2));
  }

  setPoolPropsToState() {
    //console.log(JSON.stringify(this.props.route.params.poolData, null, 2));
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
    const styles =
      this.props.theme.currentTheme === 'dark' ? darkStyles : lightStyles;
    return (
      <View style={styles.container}>
        <View style={styles.poolDetails}>
          {!this.state.loading ? (
            <View>
              <Text style={styles.title}>{this.state.pool.description}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                <View style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="book-outline"
                      type="ionicon"
                      color={styles.icon.color}
                    />
                    <Text style={{...styles.text18, marginLeft: 10}}>
                      Bookmaker
                    </Text>
                  </View>
                  <Text style={{...styles.text18, ...styles.bold}}>
                    {this.state.pool.bookmaker}
                  </Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="analytics-outline"
                      type="ionicon"
                      color={styles.icon.color}
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
                    }}>
                    {this.state.pool.quote}
                  </Text>
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
                <View style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="pie-chart-outline"
                      type="ionicon"
                      color={styles.icon.color}
                    />
                    <Text style={{...styles.text18, marginLeft: 10}}>
                      Stake
                    </Text>
                  </View>
                  <Text style={{...styles.text18, ...styles.bold}}>
                    {this.state.pool.stake}
                  </Text>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="trophy-outline"
                      type="ionicon"
                      color={styles.icon.color}
                    />
                    <Text style={{...styles.text18, marginLeft: 10}}>
                      Profitto
                    </Text>
                  </View>
                  <Text
                    style={{
                      ...styles.text18,
                      ...styles.bold,
                      textAlign: 'right',
                    }}>
                    {this.state.pool.profit}
                  </Text>
                </View>
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
                  <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name="book-outline" type="ionicon" color="#555" />
                      <Text style={{...styles.text18, marginLeft: 10}}>
                        Bookmaker
                      </Text>
                    </View>
                    <Text style={{...styles.text18, ...styles.bold}}></Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            <View>
              <Text style={styles.menuText}>Eventi</Text>
              <FlatList
                data={this.state.events}
                renderItem={this.renderItem}
                ListEmptyComponent={this.renderEventLoadingItem}
                keyExtractor={(item, index) => String(index)}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(PoolDetails);
