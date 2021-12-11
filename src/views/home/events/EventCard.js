import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {lightStyles, darkStyles} from '../../../components/Styles';
import Sports from '../../../components/Sports';
import moment from 'moment';
import 'moment/locale/it';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Icon} from 'react-native-elements';
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
      this.props.theme.currentTheme === 'dark' ? darkStyles : lightStyles;
    if (!this.state.loading)
      return (
        <View style={styles.cardContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text style={{...styles.text16, marginTop: 10}}>
                {moment(this.props.eventData.eventDate)
                  .format('DD MMM HH:mm')
                  .toUpperCase()}
                {'  '}
                {Sports.find(s => s.value === this.props.eventData.sport)?.icon}
                {'  '}
                {this.props.eventData.competition}
              </Text>
              <Text style={{...styles.text16, ...styles.bold, marginTop: 5}}>
                {this.props.eventData.event}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Icon
                  style={{marginRight: 5}}
                  name="play-outline"
                  type="ionicon"
                  size={16}
                  color={styles.icon.color}
                />
                <Text style={styles.text16}>
                  <Text style={styles.bold}>{this.props.eventData.proposal}</Text>
                </Text>
              </View>
              {this.props.eventData.notes !== '' && (
                <Text style={styles.text16}>{this.props.eventData.notes}</Text>
              )}
            </View>
            <View
              style={{
                ...styles.text16,
                ...styles.bold,
                ...styles.bottomRightText,
                marginTop: 10
              }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="at-outline"
                    type="ionicon"
                    size={16}
                    color={styles.icon.color}
                  />
                  <Text style={{...styles.text16, ...styles.bold, marginLeft: 5}}>
                    Quota
                  </Text>
                </View>
                <Text style={{...styles.text16, textAlign: 'right', marginTop: 5}}>
                    {(this.props.eventData.quote/100).toLocaleString("it-IT", {maximumFractionDigits: 2, minimumFractionDigits: 2})}
                </Text>
            </View>
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
