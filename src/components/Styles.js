import {StyleSheet} from 'react-native';

const lightText = '#000';
const darkText = '#CCC';

const lightStyles = StyleSheet.create({
  cardBackground: {
    backgroundColor: '#FFF',
  },
  background: {
    color: '#DDD',
  },
  primaryColor: {
    color: '#57BD7D',
  },
  primaryColorTransparency: {
    color: '#D3EEDD',
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
  storiesContainer: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  storiesCardContainer: {
    minWidth: 90,
    height: 90,
    backgroundColor: '#F0F0F0',
    padding: 15,
    marginTop: 15,
    marginBottom: 30,
    marginLeft: 30,
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
  cardPaymentsInfo: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  serviceDetails: {
    padding: 30,
    paddingBottom: 15,
    backgroundColor: '#fff',
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
  text20: {
    fontSize: 20,
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
    backgroundColor: '#222',
  },
  background: {
    color: '#000',
  },
  primaryColor: {
    color: '#57BD7D',
  },
  primaryColorTransparency: {
    color: '#1D492D',
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
  storiesContainer: {
    backgroundColor: '#222',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  storiesCardContainer: {
    minWidth: 90,
    height: 90,
    backgroundColor: '#000',
    padding: 15,
    marginTop: 15,
    marginBottom: 30,
    marginLeft: 30,
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
  cardPaymentsInfo: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  serviceDetails: {
    padding: 30,
    paddingBottom: 15,
    backgroundColor: '#222',
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
  text20: {
    fontSize: 20,
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
