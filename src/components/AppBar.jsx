import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { useLocation } from 'react-router-native';

import AppBarLink from './AppBarLink';

const AppBar = () => {
  const location = useLocation();

  return(
    <View style={styles.container}>
      <View style={styles.links}>
        <AppBarLink route='/' text='Home' location={location.pathname} />
        <AppBarLink route='/funds' text='Fondos' location={location.pathname} />
        <AppBarLink route='/blocks' text='Bloques' location={location.pathname} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 10,
    backgroundColor: 'coral',
    alignSelf: 'stretch',
  },
  links: {
    flexDirection: 'row',
    columnGap: 10,
  },
})

export default AppBar;