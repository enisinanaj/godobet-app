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
import HomeStackRef from '../../../components/HomeStackRef';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';

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
            <Rect x="-120" y="0" rx="5" ry="5" width="100%" height="35" />
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                paddingBottom: 10,
                borderBottomWidth: 0.5,
              }}></Text>
            <Rect x="0" y="65" rx="4" ry="4" width="100%" height="30" />
            <Rect x="-50" y="100" rx="4" ry="4" width="100%" height="30" />
            <Rect x="-80" y="135" rx="4" ry="4" width="100%" height="30" />
            <Text style={{paddingTop: 10, fontSize: 18}}></Text>
          </ContentLoader>
        </View>
      );
    else
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            HomeStackRef.getRef().navigate('ServiceDetails', {
              serviceData: this.state.service,
            })
          }>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
              borderBottomWidth: 0.5,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              {this.state.service.serviceName}
            </Text>
            <Icon name="arrow-forward" type="ionicon" color="#555" />
          </View>

          <Text style={{paddingTop: 10, fontSize: 20}}>
            {this.state.service.description}
          </Text>
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
