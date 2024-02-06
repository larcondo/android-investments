import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';
import { fechaToString, currency } from '../utils/general';

const EntryItem = ({ entry }) => {
  return(
    <Link to={`/entry/${entry.id}`} underlayColor='#e3e3e3'>
      <View style={styles.item}>
        <View>
          <Text style={styles.fondo}>{ entry?.fund }</Text>
          <Text style={styles.fecha}>{ fechaToString(entry.fecha) }</Text>
        </View>
        <Text style={styles.valor}>{ currency(entry.valor) }</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 6,
    // marginBottom: 2,
  },
  fondo: {
    fontSize: 12,
    color: '#777',
  },
  fecha: {
    fontSize: 16,
  },
  valor: {
    fontSize: 20,
    alignSelf: 'center',
  }
});

export default EntryItem;