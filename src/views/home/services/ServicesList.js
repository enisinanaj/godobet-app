import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Appearance,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import ServiceCard from './ServiceCard';
import {lightStyles, darkStyles} from '../../../components/Styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';

class PoolStories extends React.Component {
  renderItem = ({item, index}) => (
    <ServiceCard
      key={index}
      serviceData={item}
      addPoolsToState={(pools) => this.props.addPoolsToState(pools)}
    />
  );

  listEmptyRenderItem = ({item}) => (
    <View>
      <ServiceCard key={1} />
      <ServiceCard key={2} />
      <ServiceCard key={3} />
    </View>
  );

  render() {
    const styles =
      this.props.theme.currentTheme === 'dark' ? darkStyles : lightStyles;
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            color: '#555',
            fontWeight: 'bold',
            margin: 30,
            marginVertical: 15,
          }}>
          I tuoi pacchetti
        </Text>
        <FlatList
          data={this.props.subscriptions}
          renderItem={this.renderItem}
          ListEmptyComponent={this.listEmptyRenderItem}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  }
}

const style2s = StyleSheet.create({
  headerImage: {width: 180, height: 40},
  container: {flex: 1},
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
export default connect(mapStateToProps, mapDispatchToProps)(PoolStories);
