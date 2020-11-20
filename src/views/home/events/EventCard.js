import React from 'react';
import {
  View,
  Text,
  Appearance,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {lightStyles, darkStyles} from '../../../components/Styles';
import moment from 'moment';
import 'moment/locale/it';
import ContentLoader, {Rect} from 'react-content-loader/native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';

moment.locale('it');

class EventCard extends React.Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    //console.log(JSON.stringify(this.props.eventData, null, 2));
    if (this.props.eventData) {
      this.setEventLoaded();
    }
  }

  setEventLoaded() {
    this.setState({loading: false});
  }
  render() {
    const styles =
      Appearance.getColorScheme() === 'dark' ? darkStyles : lightStyles;
    if (!this.state.loading)
      return (
        <View style={styles.cardContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text style={styles.text16}>
                {moment(this.props.eventData.eventDate)
                  .format('DD MMM HH:mm')
                  .toUpperCase()}
                {'  '}
                {this.props.eventData.sport} -{' '}
                {this.props.eventData.competition}
              </Text>
              <Text style={{...styles.text16, ...styles.bold}}>
                {this.props.eventData.event}
              </Text>
              <Text style={styles.text16}>
                Proposta:{' '}
                <Text style={styles.bold}>{this.props.eventData.proposal}</Text>
              </Text>
              {this.props.eventData.notes !== '' && (
                <Text style={styles.text16}>{this.props.eventData.notes}</Text>
              )}
            </View>
            <Text
              style={{
                ...styles.text16,
                ...styles.bold,
                ...styles.bottomRightText,
              }}>
              {this.props.eventData.quote}
            </Text>
          </View>
        </View>
      );
    else {
      return (
        <View style={styles.container}>
          <ContentLoader
            height={50}
            speed={1}
            backgroundColor={'#DDD'}
            foregroundColor={'#FFF'}>
            {/* Only SVG shapes */}
            <Rect x="0" y="0" rx="5" ry="5" width="100" height="20" />
            <Rect x="110" y="0" rx="4" ry="4" width="80" height="20" />

            <Rect x="0" y="30" rx="4" ry="4" width="100%" height="20" />
          </ContentLoader>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
