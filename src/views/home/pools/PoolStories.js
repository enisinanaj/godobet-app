import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import PoolStoryCard from './PoolStoryCard';
import {lightStyles, darkStyles} from '../../../components/Styles';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../store/actions/actions';
import config from '../../../store/config';
import TokenManager from '../../../components/auth/TokenManager';

const DEBUG = false;
const FOLLOWED = 1;

const loadAllPools = (url, args = {}) => {
  return TokenManager.getInstance()
    .getToken()
    .then((jwt) => {
      return fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Auth": jwt,
        },
        ...args,
      })
        .then((e) => e.json())
        .then((json) =>
          json._embedded && json._embedded.pools
            ? json._embedded.pools
            : json._embedded && json._embedded.playedPools
            ? json._embedded.playedPools
            : []
        );
    });
};

const getTipCards = (dropdownHidden) => (pools) => {
  if (pools.length === 0) {
    return (
      <Text>Nessuna tip in questo momento.</Text>
    );
  }

  return pools.map((pool, i) => {
    return (
      <PoolStoryCard key={i} poolData={pool} />
    );
  });
};

class PoolStories extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      noError: true,
      service: {},
      expiredPools: [],
      ongoingPools: [],
      followedPools: [],
    }
  }

  renderItem = ({item, index}) => <PoolStoryCard key={index} poolData={item} />;

  listEmptyRenderItem = ({item}) => (
    <View style={{flexDirection: 'row', marginRight: 30}}>
      <PoolStoryCard key={1} />
      <PoolStoryCard key={2} />
      <PoolStoryCard key={3} />
      <PoolStoryCard key={4} />
    </View>
  );

  componentDidMount() {
    let pools = this.getMyPools();
    let playedPools = this.getPlayReference();

    playedPools
      .then((playedPools) => pools.then((pools) => [pools, playedPools]))
      .then((poolsSets) => {
        return poolsSets[0].filter(
          (pool) => !poolsSets[1].find((pp) => pp.references.pool === pool.id || pool.outcome)
        )
      })
      .then((ongoingPools) => this.setState({ ongoingPools: ongoingPools.map(p => ({...p, type: 'ongoing'}))}));

    playedPools
      .then((playedPools) => {
        return pools.then((pools) => [pools, playedPools]);
      })
      .then((poolsSets) => {
        // this.getExpiredPoolsCards(pools, (pool) => poolsSets[1].find((pp) => pp.references.pool === pool.id) && !!pool.outcome)
        // .then((expiredPools) => {
        //   if (expiredPools) {
        //     this.setState({expiredPools: expiredPools.map(p => ({...p, type: 'expired'}))})
        //   }
        // });

        return poolsSets[0].filter((pool) =>
          poolsSets[1].find(
            (pp) => pp.references.pool === pool.id && pp.direction === FOLLOWED
          )
        )
      })
      .then((filteredPools) => filteredPools.filter((p) => !p.outcome).sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)))
      .then((followedPools) => {
        this.setState({ followedPools: followedPools.map(p => ({...p, type: 'followed'})) })
      });
  }

  getMyPools = () => {
    return loadAllPools(
      `${config.API_URL}/pools/search/subscriberPools?subscriber=${this.props.app.user._links.self.href}&page=0&size=1000`
    ).catch(console.error);
  };

  getPlayReference = () => {
    return loadAllPools(
      `${this.props.app.user._links.self.href}/playedPoolsRel?page=0&size=1000`
    ).catch(console.error);
  };

  filterMyPools = (pools) => {
    const myPools =
      this.props.user._embedded && this.props.user._embedded.playedPools
        ? this.props.user._embedded.playedPools.map((pool) => pool.id)
        : [];
    return pools.map((pool) => {
      return { ...pool, followed: myPools.includes(pool.id) };
    });
  };

  getExpiredPoolsCards = (pools, filter) => {
    return (
      pools
        .then((pools) => pools.filter(filter).sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)))
        .then(expiredPools => expiredPools.filter(pool => new Date(pool.createdOn).getTime() > new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
        .then((pool) => getTipCards(!filter(pool))(pool))
    );
  };

  render() {
    const styles = this.props.theme.currentTheme === 'dark' ? darkStyles : lightStyles;
    return (
      <View style={styles.storiesContainer}>
        <Text
          style={{
            marginHorizontal: 30,
            marginTop: 15,
            fontWeight: 'bold',
            paddingBottom: 10,
            ...styles.text20,
          }}>
          Le tue schedine
        </Text>
        <FlatList
          data={[...this.state.ongoingPools, ...this.state.followedPools]}
          renderItem={this.renderItem}
          ListEmptyComponent={this.listEmptyRenderItem}
          horizontal
          ListFooterComponent={<View style={{marginLeft: 30}} />}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(PoolStories);
