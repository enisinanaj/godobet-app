import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {darkStyles} from '../../../components/Styles';
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
import { normalizeUrl } from '../../../components/Utils';

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
        fetch(normalizeUrl(this.props.serviceData._links.services.href), {
          method: 'GET',
          headers: {'Content-Type': 'application/json', 'X-Auth': token},
        })
          .then((response) => response.json())
          .then((response) => {
            if (response) {
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
    return this.props.serviceData.remainingDays;
  }

  render() {
    const styles = darkStyles;
    if (this.state.loading)
      return (
        <View style={styles.serviceCardContainer}>
          <ContentLoader
            height={120}
            speed={1}
            backgroundColor={'#DDD'}
            foregroundColor={'#FFF'}
            viewBox="0 0 400 160">
            {/* Only SVG shapes */}
            <Rect x="-180" y="0" rx="5" ry="5" width="100%" height="35" />

            <Rect x="-200" y="65" rx="4" ry="4" width="100%" height="30" />
            <Rect x="-220" y="100" rx="4" ry="4" width="100%" height="30" />
            <Rect x="-270" y="135" rx="4" ry="4" width="100%" height="30" />
            <Circle cx="310" cy="80" r="65" />
          </ContentLoader>
        </View>
      );
    else
      return (
        <TouchableOpacity
          style={styles.serviceCardContainer}
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
            <View style={{flexDirection: 'column', flex: 1, marginRight: 5}}>
              <Text style={styles.title}>{this.state.service.serviceName}</Text>
              <Text style={styles.subtitle}>
                {this.state.service.description.substr(0, 70)}...
              </Text>
            </View>
            <View style={{marginRight: 15, marginTop: 10}}>
              <ProgressCircle
                percent={
                  (this.getDaysToNextPayment() * 100) /
                  this.state.service.duration
                }
                radius={35}
                borderWidth={10}
                color={styles.primaryColor.color}
                shadowColor={styles.primaryColorTransparency.color}
                bgColor={styles.cardBackground.backgroundColor}>
                {this.getDaysToNextPayment() >= 0 ? (
                  <View>
                    <Text
                      style={{
                        ...styles.text9,
                        textAlign: 'center',
                        padding: 2,
                        paddingBottom: 0,
                      }}>
                      giorni
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#57BD7D',
                        textAlign: 'center',
                        paddingHorizontal: 5,
                        fontWeight: 'bold',
                      }}>
                      {this.getDaysToNextPayment()}
                    </Text>
                    <Text
                      style={{
                        ...styles.text9,
                        textAlign: 'center',
                        padding: 2,
                        paddingTop: 0,
                      }}>
                      al rinnovo
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#57BD7D',
                      textAlign: 'center',
                      paddingHorizontal: 5,
                      fontWeight: 'bold',
                    }}>
                    scaduto
                  </Text>
                )}
              </ProgressCircle>
            </View>
            <View style={{height: '100%', marginLeft: -10}}>
              <Icon
                name="arrow-forward"
                type="ionicon"
                color={styles.icon.color}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ServiceCard);
