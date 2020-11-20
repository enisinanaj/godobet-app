import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Appearance,
  TextInput,
  ActivityIndicator,
  LogBox,
} from 'react-native';
import {Icon} from 'react-native-elements';
import TokenManager from '../../../components/auth/TokenManager';
import {lightStyles, darkStyles} from '../../../components/Styles';
import ContentLoader, {Rect} from 'react-content-loader/native';
import PoolsList from '../pools/PoolsList';
import ServicePaymentsInfo from './ServicePaymentsInfo';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

class ServiceDetails extends React.Component {
  state = {
    taxonomies: [],
    detailsType: 'Schedine',
    taxonomiesLoaded: false,
  };

  componentDidMount() {
    if (!this.props.route.params.serviceData) this.props.navigation.goBack();
    /*console.log(
      JSON.stringify(this.props.route.params.subscriptionData, null, 2),
    );*/
    this.getTaxonomies();
  }

  async getTaxonomies() {
    var token = await TokenManager.getInstance().getToken();
    try {
      fetch(this.props.route.params.serviceData._links.taxonomies.href, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'X-Auth': token},
      })
        .then((response) => response.json())
        .then((response) => {
          if (response._embedded) {
            let arrayTaxonomies = [];
            for (let taxonomy of response._embedded.taxonomy) {
              arrayTaxonomies.push(taxonomy.definition);
            }
            this.setState({
              taxonomies: arrayTaxonomies,
              taxonomiesLoaded: true,
              taxonomiesObjects: response._embedded.taxonomy,
            });
            //console.log(arrayTaxonomies);
          }
        });
    } catch {
      // this.props.history.push("/login");
    }
  }

  changeDetailsOnTabPress(tab) {
    this.setState({detailsType: tab});
  }

  tagView(tag, index) {
    return (
      <View
        key={index}
        style={{
          marginRight: 15,
          marginTop: 15,
        }}>
        <Text style={{fontSize: 16, color: '#555'}}>#{tag}</Text>
      </View>
    );
  }

  render() {
    const styles =
      this.props.theme.currentTheme === 'dark' ? darkStyles : lightStyles;
    return (
      <View style={styles.container}>
        <View style={styles.serviceDetails}>
          {this.state.detailsType == 'Schedine' ? (
            <View>
              <Text style={{...styles.title, marginBottom: 0}}>
                {this.props.route.params.serviceData.serviceName}
              </Text>
              <Text style={styles.subtitle}>
                {this.props.route.params.serviceData.description}
              </Text>

              {this.state.taxonomiesLoaded ? (
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}>
                  <Icon
                    style={{marginRight: 15}}
                    name="pricetag-outline"
                    type="ionicon"
                    color={styles.icon.color}
                  />
                  <Text style={{marginTop: 15, fontSize: 16}}></Text>
                  {this.state.taxonomies.map((tag, index) =>
                    this.tagView(tag, index),
                  )}
                </View>
              ) : (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="pricetag-outline"
                    type="ionicon"
                    color={styles.icon.color}
                  />
                  <Text style={{marginTop: 15, fontSize: 17}}></Text>
                  <ContentLoader
                    style={{flex: 1}}
                    speed={1}
                    backgroundColor={'#DDD'}
                    foregroundColor={'#FFF'}>
                    <Rect x="10" y="6" rx="5" ry="5" width="80" height="25" />
                    <Rect x="110" y="6" rx="5" ry="5" width="50" height="25" />
                    <Rect x="180" y="6" rx="5" ry="5" width="40" height="25" />
                  </ContentLoader>
                </View>
              )}
            </View>
          ) : (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    borderRightWidth: 0.5,
                    flex: 1,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="wallet-outline"
                      type="ionicon"
                      color={styles.icon.color}
                    />
                    <Text style={{...styles.text20, marginLeft: 10}}>
                      Prezzo
                    </Text>
                  </View>
                  <Text
                    style={{
                      ...styles.text20,
                      fontWeight: 'bold',
                    }}>
                    {this.props.route.params.serviceData.price} €
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'flex-end',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="time-outline"
                      type="ionicon"
                      color={styles.icon.color}
                    />
                    <Text
                      style={{
                        ...styles.text20,
                        marginLeft: 10,
                        textAlign: 'right',
                      }}>
                      Durata
                    </Text>
                  </View>
                  <Text
                    style={{
                      ...styles.text20,
                      fontWeight: 'bold',
                      textAlign: 'right',
                    }}>
                    {this.props.route.params.serviceData.duration} giorni
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
        <Tab.Navigator
          tabBarOptions={{
            style: {
              ...styles.cardBackground,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              overflow: 'hidden',
            },
            labelStyle: {
              fontSize: 16,
            },
            activeTintColor: styles.primaryColor.color,
            inactiveTintColor: 'grey',
            indicatorStyle: {
              backgroundColor: styles.primaryColor.color,
            },
          }}>
          <Tab.Screen
            name="Schedine"
            component={PoolsList}
            initialParams={{
              changeDetailsOnTabPress: (tab) =>
                this.changeDetailsOnTabPress(tab),
              pools: this.props.route.params.serviceData._embedded
                ? this.props.route.params.serviceData._embedded.pools
                : null,
            }}
          />
          <Tab.Screen
            name="Pagamenti"
            component={ServicePaymentsInfo}
            initialParams={{
              changeDetailsOnTabPress: (tab) =>
                this.changeDetailsOnTabPress(tab),
              serviceData: this.props.route.params.serviceData,
              subscriptionData: this.props.route.params.subscriptionData,
            }}
          />
        </Tab.Navigator>
      </View>
    );
  }
}
const styles2 = StyleSheet.create({
  headerImage: {width: 180, height: 40},
  serviceDetails: {
    padding: 30,
    paddingBottom: 15,
    backgroundColor: '#fff',
    //borderBottomWidth: 0.5,
  },
  container: {
    flex: 1,
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
export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetails);
