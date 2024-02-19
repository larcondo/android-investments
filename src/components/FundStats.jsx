import { View, Text, StyleSheet } from 'react-native';
import { currency } from '../utils/general';

import AreaChart from './AreaChart';
import EntryList from './EntryList';

const SummaryValue = ({ value, label }) => {
  return(
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryValue}>{ value }</Text>
      <Text style={styles.summaryLabel}>{ label }</Text>
    </View>
  );
};

const FundStats = ({ title, entryArray }) => {
  if (entryArray.length < 1) return null;

  const incremento = entryArray[entryArray.length-1].valor - entryArray[0].valor;
  const porcentaje = (incremento / entryArray[0].valor)*100;

  return(
    <View style={styles.container}>
      <Text style={styles.title}>{ title }</Text>
      <AreaChart data={
        entryArray.map((e, _, array) => {
          return {
            value: ((e.valor * 100) / array[0].valor) - 100,
          };
        })
      } />
      <View style={styles.summary}>
        <SummaryValue value={currency(incremento)} label={'Pesos'} />
        <SummaryValue
          value={porcentaje.toLocaleString('es-ES') + ' %'}
          label={'Porcentaje'}
        />
      </View>
      <EntryList entries={
        entryArray.map((e, index, array) => {
          return {
            ...e,
            prevDiff: (index === 0) ? null : e.valor - array[index-1].valor,
          };
        })
      } />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  summaryContainer: {
    paddingVertical: 10,
  },
  summaryValue: {
    color: '#444',
    fontSize: 24,
    textAlign: 'center',
  },
  summaryLabel: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 12,
  }
});

export default FundStats;