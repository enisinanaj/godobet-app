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
import TokenManager from '../../../components/auth/TokenManager';
import ContentLoader, {Rect} from 'react-content-loader/native';
import PoolsList from '../pools/PoolsList';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

class ServiceDetails extends React.Component {
  state = {taxonomies: []};

  componentDidMount() {
    if (!this.props.route.params.serviceData) this.props.navigation.goBack();
    //console.log(this.props.route.params.serviceData);
    //this.getTaxonomies();
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
              taxonomiesObjects: response._embedded.taxonomy,
            });
            console.log(arrayTaxonomies);
          }
        });
    } catch {
      // this.props.history.push("/login");
    }
  }

  tagView(tag, index) {
    return (
      <View
        key={index}
        style={{
          backgroundColor: 'lightblue',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          padding: 7,
          marginRight: 15,
          marginTop: 15,
        }}>
        <Text style={{fontSize: 17}}>#{tag}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.serviceDetails}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            {this.props.route.params.serviceData.serviceName}
          </Text>
          <Text style={{fontSize: 18}}>
            {this.props.route.params.serviceData.description}
          </Text>
          <Text style={{fontSize: 18}}>
            {this.props.route.params.serviceData.price}€ ogni{' '}
            {this.props.route.params.serviceData.duration} giorni
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {this.state.taxonomies.map((tag, index) =>
              this.tagView(tag, index),
            )}
          </View>
        </View>
        <Tab.Navigator
          tabBarOptions={{
            style: {
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              overflow: 'hidden',
            },
            labelStyle: {
              fontSize: 16,
            },
            activeTintColor: '#57BD7D',
            inactiveTintColor: 'grey',
            indicatorStyle: {
              backgroundColor: '#57BD7D',
            },
          }}>
          <Tab.Screen
            name="Schedine"
            component={PoolsList}
            initialParams={{
              pools: this.props.route.params.serviceData._embedded
                ? this.props.route.params.serviceData._embedded.pools
                : null,
            }}
          />
          <Tab.Screen
            name="Pagamenti"
            component={PoolsList}
            initialParams={{
              pools: this.props.route.params.serviceData._embedded
                ? this.props.route.params.serviceData._embedded.pools
                : null,
            }}
          />
        </Tab.Navigator>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
