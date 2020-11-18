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
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import HomeStackRef from '../../../components/HomeStackRef';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';
import moment from 'moment';
import 'moment/locale/it';
moment.locale('it');
import ProgressCircle from 'react-native-progress-circle';

class ServiceCard extends React.Component {
  state = {
    loading: true,
    noError: true,
    service: {},
  };

  componentDidMount() {
    if (this.props.serviceData) {
      this.getServiceDetails();
    }
  }

  async getServiceDetails() {
    var token = await TokenManager.getInstance().getToken();
    this.setState({loading: true, noErrors: true}, () => {
      try {
        fetch(this.props.serviceData._links.services.href, {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'X-Auth': token},
        })
          .then((response) => response.json())
          .then((response) => {
            if (response) {
              //console.log(JSON.stringify(this.props.serviceData, null, 2));
              //console.log(JSON.stringify(response, null, 2));
              this.setState({
                loading: false,
                noErrors: true,
                service: response,
              });
              if (response._embedded && response._embedded.pools) {
                this.props.addPoolsToState(response._embedded.pools);
              }
            }
          });
      } catch (error) {
        console.log(JSON.stringify(error, null, 2));
      }
    });
  }

  getDaysToNextPayment() {
    const ultimoPagamento = moment(this.props.serviceData.lastCharge);
    const dataScadenza = ultimoPagamento.add(
      this.state.service.duration,
      'days',
    );
    return ultimoPagamento.diff(moment().startOf('days'), 'days');
  }

  render() {
    if (this.state.loading)
      return (
        <View style={styles.container}>
          <ContentLoader
            height={120}
            speed={1}
            backgroundColor={'#DDD'}
            foregroundColor={'#FFF'}
            viewBox="0 0 400 160">
            {/* Only SVG shapes */}
            <Rect x="-150" y="0" rx="5" ry="5" width="100%" height="35" />

            <Rect x="-180" y="65" rx="4" ry="4" width="100%" height="30" />
            <Rect x="-220" y="100" rx="4" ry="4" width="100%" height="30" />
            <Rect x="-250" y="135" rx="4" ry="4" width="100%" height="30" />
            <Circle cx="330" cy="80" r="65" />
          </ContentLoader>
        </View>
      );
    else
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            HomeStackRef.getRef().navigate('ServiceDetails', {
              serviceData: this.state.service,
              subscriptionData: this.props.serviceData,
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                }}>
                {this.state.service.serviceName}
              </Text>
              <Text style={{paddingTop: 10, fontSize: 20}}>
                {this.state.service.description}
              </Text>
            </View>
            <ProgressCircle
              percent={
                (this.getDaysToNextPayment() * 100) /
                this.state.service.duration
              }
              radius={60}
              borderWidth={14}
              color="#57BD7D"
              shadowColor="#D3EEDD"
              bgColor="#fff">
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  padding: 2,
                  paddingBottom: 0,
                }}>
                giorni
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: '#57BD7D',
                  textAlign: 'center',
                  paddingHorizontal: 5,
                  fontWeight: 'bold',
                }}>
                {this.getDaysToNextPayment()}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  padding: 2,
                  paddingTop: 0,
                }}>
                al rinnovo
              </Text>
            </ProgressCircle>
          </View>
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  headerImage: {width: 180, height: 40},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 30,
    padding: 15,
    marginHorizontal: 30,
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
export default connect(mapStateToProps, mapDispatchToProps)(ServiceCard);
