import { StyleSheet, Text, View } from 'react-native';

const FundItem = ({ fund }) => {
  return(
    <View style={styles.item}>
      <Text style={styles.itemId}>{ fund.id }</Text>
      <Text style={styles.itemNombre}>{ fund.nombre }</Text>
      <Text style={styles.itemDesc} numberOfLines={1}>{ fund.descripcion }</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  itemId: {
    width: '10%',
    textAlign: 'center',
  },
  itemNombre: {
    width: '40%',
    fontWeight: 'bold',
  },
  itemDesc: {
    width: '50%',
    color: '#888',
  }
});

export default FundItem;