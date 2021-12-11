import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';
import {lightStyles, darkStyles} from '../../../components/Styles';
import moment from 'moment';
import 'moment/locale/it';
moment.locale('it');

class ServicePaymentsInfo extends React.Component {
  componentDidMount() {
    this.tabPressListener = this.props.navigation.addListener('focus', (e) => {
      this.props.route.params.changeDetailsOnTabPress('Pagamenti');
    });
    console.warn(this.props.route.params.subscriptionData)
  }

  componentWillUnmount() {
    if (this.tabPressListener !== undefined) {
      this.tabPressListener();
    }
  }

  getDataScadenza() {
    const ultimoPagamento = moment(
      this.props.route.params.subscriptionData.subscribedOn,
    );
    return ultimoPagamento.add(
      this.props.route.params.serviceData.duration,
      'days',
    );
  }

  getDaysToNextPayment() {
    return this.props.route.params.serviceData.remainingDays;
  }

  render() {
    const styles =
      this.props.theme.currentTheme === 'dark' ? darkStyles : lightStyles;
    return (
      <View style={{...styles.container, padding: 30}}>
        <View style={styles.cardPaymentsInfo}>
          <Text style={styles.text18}>Ultima iscrizione</Text>
          <Text style={{...styles.text18, fontWeight: 'bold'}}>
            {moment(this.props.route.params.subscriptionData.subscribedOn).calendar() + '\n'}
            {this.props.route.params.serviceData.free ? "Gratis" : 
            (this.props.route.params.serviceData.price/100).toLocaleString("it-IT", {maximumFractionDigits: 2, minimumFractionDigits: 2}) + '€'}
          </Text>
        </View>
        <View style={styles.cardPaymentsInfo}>
          <Text style={styles.text18}>Scadenza</Text>
          <Text style={{...styles.text18, fontWeight: 'bold'}}>
            {moment(this.getDataScadenza()).locale('it-IT').format('DD MMM YY')}
            <Text style={{fontSize: 18, fontWeight: 'normal'}}>
              {' - '}
              {moment(this.getDataScadenza()).locale('it-IT').fromNow()}
            </Text>
          </Text>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                height: 15,
                borderTopRightRadius: 7,
                borderBottomRightRadius: 7,
                borderTopLeftRadius: 7,
                borderBottomLeftRadius: 7,
                backgroundColor: (this.props.route.params.subscriptionData.remainingDays / this.props.route.params.subscriptionData.service.duration) > 0.5 
                  ? styles.primaryColorTransparency.color
                  : '#300',
              }}
            >
              <View
                style={{
                  flex: (this.props.route.params.subscriptionData.remainingDays / this.props.route.params.subscriptionData.service.duration),
                  height: 15,
                  borderTopRightRadius: 7,
                  borderBottomRightRadius: 7,
                  borderTopLeftRadius: 7,
                  borderBottomLeftRadius: 7,
                  backgroundColor: (this.props.route.params.subscriptionData.remainingDays / this.props.route.params.subscriptionData.service.duration) > 0.5 ?
                    styles.primaryColor.color
                    : '#800',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
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
