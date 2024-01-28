import { StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';

const AppBarLink = ({ route, text, location }) => {
  return(
    <Link
      to={route}
      style={{
        borderBottomWidth: 5,
        borderBottomColor: route === location ? 'red': 'coral',
      }}
      underlayColor={'coral'}
    >
      <Text style={styles.text}>
        { text }
      </Text>
    </Link>
  );
};

const styles = StyleSheet.create({
  link: {
    backgroundColor: 'red',
  },
  text: {
    padding: 10,
  },
});

export default AppBarLink;