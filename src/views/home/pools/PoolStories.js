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
import PoolStoryCard from './PoolStoryCard';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';

class PoolStories extends React.Component {
  state = {
    loading: true,
    noError: true,
    service: {},
  };

  renderItem = ({item, index}) => <PoolStoryCard key={index} poolData={item} />;

  listEmptyRenderItem = ({item}) => (
    <View style={{flexDirection: 'row', marginRight: 30}}>
      <PoolStoryCard key={1} />
      <PoolStoryCard key={2} />
      <PoolStoryCard key={3} />
      <PoolStoryCard key={4} />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            marginHorizontal: 30,
            marginTop: 15,
            fontSize: 20,
            fontWeight: 'bold',
            paddingBottom: 10,
            color: '#555',
          }}>
          Le tue schedine
        </Text>
        <FlatList
          data={this.props.pools}
          renderItem={this.renderItem}
          ListEmptyComponent={this.listEmptyRenderItem}
          horizontal
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerImage: {width: 180, height: 40},
  container: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
export default connect(mapStateToProps, mapDispatchToProps)(PoolStories);
