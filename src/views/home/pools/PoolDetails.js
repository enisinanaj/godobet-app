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
import PoolCard from '../pools/PoolCard';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';
import EventCard from '../events/EventCard';

class PoolDetails extends React.Component {
  componentDidMount() {
    if (!this.props.route.params.poolData) this.props.navigation.goBack();
    //console.log(JSON.stringify(this.props.route.params.poolData, null, 2));
    //this.getTaxonomies();
  }

  renderItem = ({item, index}) => <EventCard key={index} eventData={item} />;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.poolDetails}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            {this.props.route.params.poolData.description}
          </Text>
          <Text style={{fontSize: 18}}>
            {this.props.route.params.poolData.bookmaker}
          </Text>
          <Text style={{fontSize: 18}}>
            Quota: {this.props.route.params.poolData.quote}
          </Text>
        </View>
        <View style={styles.eventsContainer}>
          {this.props.route.params.poolData.events ? (
            <View>
              <Text
                style={{
                  margin: 30,
                  marginTop: 15,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Eventi
              </Text>
              <FlatList
                data={this.props.route.params.poolData.events}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => String(index)}
              />
            </View>
          ) : (
            <Text
              style={{
                margin: 30,
                marginTop: 15,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Nessun evento presente
            </Text>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerImage: {width: 180, height: 40},
  poolDetails: {
    padding: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  container: {
    flex: 1,
  },
  eventsContainer: {
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
export default connect(mapStateToProps, mapDispatchToProps)(PoolDetails);
