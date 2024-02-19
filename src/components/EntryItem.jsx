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
        <View>
          <Text style={styles.valor}>{ currency(entry.valor) }</Text>
          <Text style={[
            styles.prevDiff,
            entry.prevDiff && entry.prevDiff < 0 ? { color: 'red' } : null,
            entry.prevDiff && entry.prevDiff > 0 ? { color: 'green' } : null
          ]}>
            { entry.prevDiff ? currency(entry.prevDiff) : 'Inicial' }
          </Text>
        </View>
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
  },
  prevDiff: {
    textAlign: 'right',
    fontSize: 12,
    color: '#999',
  }
});

export default EntryItem;