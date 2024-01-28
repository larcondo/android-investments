import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';

const BlockItem = ({ block }) => {
  return(
    <Link to={`/block/${block.id}`} underlayColor={'#e3e3e3'}>
      <View style={styles.item}>
        <Text style={styles.itemId}>{ block.id }</Text>
        <Text style={styles.itemNombre}>{ block.nombre }</Text>
        <Text style={styles.itemDesc} numberOfLines={1}>{ block.descripcion }</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  itemId: {
    // backgroundColor: 'lightblue',
    width: '10%',
    textAlign: 'center',
  },
  itemNombre: {
    // backgroundColor: 'coral',
    width: '40%',
    fontWeight: 'bold',
  },
  itemDesc: {
    // backgroundColor: 'yellow',
    width: '50%',
    color: '#888',
  }
})

export default BlockItem;