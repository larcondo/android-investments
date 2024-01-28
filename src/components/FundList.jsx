import { StyleSheet, Text, FlatList } from 'react-native';

import FundItem from './FundItem';
import ListSeparator from './ListSeparator';

const FundList = ({ funds }) => {
  if (!funds || funds.length < 1) return <Text>No hay fondos por el momento.</Text>;

  return(
    <FlatList
      data={funds}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <FundItem fund={item} />}
      style={styles.itemList}
      ItemSeparatorComponent={<ListSeparator />}
    />
  );
};

const styles = StyleSheet.create({
  itemList: {
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
});

export default FundList;