import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
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
          data={this.props.subscriptions.filter(sub => sub.valid && !sub.expired)}
          renderItem={this.renderItem}
          ListEmptyComponent={this.listEmptyRenderItem}
          keyExtractor={(item, index) => String(index)}
        />
        {/* <Text
          style={{
            fontSize: 20,
            color: '#555',
            fontWeight: 'bold',
            margin: 30,
            marginVertical: 15,
          }}>
          Servizi scaduti
        </Text>
        <FlatList
          data={this.props.subscriptions.filter(sub => !sub.valid || sub.expired)}
          renderItem={this.renderItem}
          ListEmptyComponent={this.listEmptyRenderItem}
          keyExtractor={(item, index) => String(index)}
        />*/}
      </View>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(PoolStories);
