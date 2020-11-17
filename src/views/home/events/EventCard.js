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
import moment from 'moment';
import 'moment/locale/it';
import ContentLoader, {Rect} from 'react-content-loader/native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';

moment.locale('it');

class EventCard extends React.Component {
  componentDidMount() {
    //console.log(JSON.stringify(this.props.eventData, null, 2));
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text
              style={{
                fontSize: 16,
              }}>
              {moment(this.props.eventData.eventDate)
                .format('DD MMM HH:mm')
                .toUpperCase()}
              {'  '}
              {this.props.eventData.sport} - {this.props.eventData.competition}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {this.props.eventData.event}
            </Text>
            <Text
              style={{
                fontSize: 16,
              }}>
              Proposta:{' '}
              <Text style={{fontWeight: 'bold'}}>
                {this.props.eventData.proposal}
              </Text>
            </Text>
            {this.props.eventData.notes !== '' && (
              <Text
                style={{
                  fontSize: 16,
                }}>
                {this.props.eventData.notes}
              </Text>
            )}
          </View>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: 'bold',
              textAlignVertical: 'bottom',
              textAlign: 'right',
            }}>
            {this.props.eventData.quote}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerImage: {width: 180, height: 40},
  container: {
    flex: 1,
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    //padding: 15,
    marginHorizontal: 30,
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
export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
