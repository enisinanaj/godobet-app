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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';
import moment from 'moment';
import 'moment/locale/it';
moment.locale('it');

class ServicePaymentsInfo extends React.Component {
  componentDidMount() {
    this.tabPressListener = this.props.navigation.addListener('focus', (e) => {
      this.props.route.params.changeDetailsOnTabPress('Pagamenti');
    });
    //console.log(this.props.route.params);
  }

  componentWillUnmount() {
    if (this.tabPressListener !== undefined) {
      this.tabPressListener();
    }
  }

  getDataScadenza() {
    const ultimoPagamento = moment(
      this.props.route.params.subscriptionData.lastCharge,
    );
    return ultimoPagamento.add(
      this.props.route.params.serviceData.duration,
      'days',
    );
  }

  getDaysToNextPayment() {
    return this.getDataScadenza().diff(moment().startOf('day'), 'days');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={{fontSize: 18}}>Ultimo pagamento</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {moment(this.props.route.params.subscriptionData.lastCharge).format(
              'DD-MM-YYYY HH:mm',
            )}
            <Text style={{fontWeight: 'normal'}}>
              {' - '}
              {moment(
                this.props.route.params.subscriptionData.lastCharge,
              ).fromNow()}
            </Text>
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={{fontSize: 18}}>Scadenza</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {moment(this.getDataScadenza()).format('DD-MM-YYYY HH:mm')}
            <Text style={{fontSize: 18, fontWeight: 'normal'}}>
              {' - '}
              {moment(this.getDataScadenza()).fromNow()}
            </Text>
          </Text>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View
              style={{
                flex:
                  (this.getDaysToNextPayment() * 100) /
                  this.props.route.params.serviceData.duration,
                height: 15,
                borderTopLeftRadius: 7,
                borderBottomLeftRadius: 7,
                backgroundColor: '#57BD7D',
              }}
            />
            <View
              style={{
                flex:
                  100 -
                  (this.getDaysToNextPayment() * 100) /
                    this.props.route.params.serviceData.duration,
                height: 15,
                borderTopRightRadius: 7,
                borderBottomRightRadius: 7,
                backgroundColor: '#D3EEDD',
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServicePaymentsInfo);
