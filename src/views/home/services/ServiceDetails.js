import React from 'react';
import {
  View,
  Text,
  LogBox,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {darkStyles} from '../../../components/Styles';
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
    pools: [],
    detailsType: 'Schedine',
    taxonomiesLoaded: false,
    serviceImage: null
  };

  componentDidMount() {
    if (!this.props.route.params.serviceData) this.props.navigation.goBack();
    this.getServiceIcon();
  }

  getServiceIcon() {
    if (this.props.route.params.serviceData.media && this.props.route.params.serviceData.media.length > 0) {
      const imageUrl = this.props.route.params.serviceData.media.sort((a, b) => a.mediaIteration - b.mediaIteration)[0].url;
      this.setState({serviceImage: imageUrl.substr(0, imageUrl.indexOf('?'))});
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
    const styles = darkStyles;

    return (
      <View style={styles.container}>
        <View style={styles.serviceDetails}>
          {this.state.detailsType == 'Schedine' ? (
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <View>
                <Text style={{...styles.title, marginBottom: 0}}>
                  {this.props.route.params.serviceData.serviceName}
                </Text>

                <Text style={styles.subtitle}>
                  {this.props.route.params.serviceData.description}
                </Text>
              </View>
            </View>
          ) : (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={localStyles.mainInfoItem}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon
                      name="people-outline"
                      type="ionicon"
                      color={styles.icon.color}
                    />
                    <Text style={{...styles.text20, marginLeft: 10}}>
                      Iscritti
                    </Text>
                  </View>
                  <Text
                    style={{
                      ...styles.text20,
                      fontWeight: 'bold',
                    }}>
                    {this.props.route.params.serviceData.subscribersCount} su {this.props.route.params.serviceData.maxSubscribers}
                  </Text>
                </View>
                <View style={[localStyles.mainInfoItem, {alignItems: 'center'}]}>
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
                    {this.props.route.params.serviceData.free ? "Gratis"
                    : (this.props.route.params.serviceData.price/100).toLocaleString("it-IT", {maximumFractionDigits: 2, minimumFractionDigits: 2}) + '€'}
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
          sceneContainerStyle={styles.container}
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
              changeDetailsOnTabPress: a => this.changeDetailsOnTabPress(a),
              serviceData: this.props.route.params.serviceData,
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

const localStyles = StyleSheet.create({
  mainInfoItem: {
    flexDirection: 'column',
    borderRightWidth: 0.5,
    flex: 1,
  }
})

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetails);
