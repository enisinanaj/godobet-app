import {StyleSheet} from 'react-native';

const lightText = '#000';
const darkText = '#CCC';

const lightStyles = StyleSheet.create({
  cardBackground: {
    color: '#FFF',
  },
  container: {
    backgroundColor: '#DDD',
    flex: 1,
  },
  serviceCardContainer: {
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
  cardContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginHorizontal: 30,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  text14: {
    fontSize: 14,
    color: lightText,
  },
  text16: {
    fontSize: 16,
    color: lightText,
  },
  text18: {
    fontSize: 18,
    color: lightText,
  },
  bold: {fontWeight: 'bold'},
  bottomRightText: {
    textAlignVertical: 'bottom',
    textAlign: 'right',
  },
  title: {
    fontSize: 22,
    color: lightText,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    color: lightText,
  },
  menuText: {
    margin: 30,
    marginVertical: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
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
  icon: {
    color: '#000',
  },
  headerTint: {
    color: lightText,
  },
  headerBackground: {
    backgroundColor: '#FFF',
  },
});

const darkStyles = StyleSheet.create({
  cardBackground: {
    color: '#222',
  },
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  serviceCardContainer: {
    backgroundColor: '#222',
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
  cardContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#222',
    marginHorizontal: 30,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  text14: {
    fontSize: 14,
    color: darkText,
  },
  text16: {
    fontSize: 16,
    color: darkText,
  },
  text18: {
    fontSize: 18,
    color: darkText,
  },
  bold: {fontWeight: 'bold'},
  bottomRightText: {
    textAlignVertical: 'bottom',
    textAlign: 'right',
  },
  title: {
    fontSize: 22,
    color: darkText,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    color: darkText,
  },
  menuText: {
    margin: 30,
    marginVertical: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  poolDetails: {
    padding: 30,
    backgroundColor: '#222',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  icon: {
    color: darkText,
  },
  headerTint: {
    color: darkText,
  },
  headerBackground: {
    backgroundColor: '#222',
  },
});

export {lightStyles, darkStyles};
