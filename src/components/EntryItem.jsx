import { StyleSheet, Text, View } from 'react-native';

const fechaToString = ( f ) => {
  const values = f.split('-');
  const meses = {
    mes01: 'ene',
    mes02: 'feb',
    mes03: 'mar',
    mes04: 'abr',
    mes05: 'may',
    mes06: 'jun',
    mes07: 'jul',
    mes08: 'ago',
    mes09: 'sep',
    mes10: 'oct',
    mes11: 'nov',
    mes12: 'dic',
  };

  return `${values[2]} ${meses['mes' + values[1]]} ${values[0]}`;
};

const currency = ( val ) => {
  return '$ ' + val.toLocaleString('es-ES');
};

const EntryItem = ({ entry }) => {
  return(
    <View style={styles.item}>
      <View>
        <Text style={styles.fondo}>{ entry?.fund }</Text>
        <Text style={styles.fecha}>{ fechaToString(entry.fecha) }</Text>
      </View>
      <Text style={styles.valor}>{ currency(entry.valor) }</Text>
    </View>
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