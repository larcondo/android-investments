import { StyleSheet, Text, View, FlatList } from 'react-native';

import BlockItem from './BlockItem';
import ListSeparator from './ListSeparator';

const BlockList = ({ blocks }) => {
  if (!blocks || blocks.length < 1) return <Text>No hay bloques actualmente...</Text>;

  return(
    <FlatList
      data={blocks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <BlockItem block={item} />}
      style={styles.list}
      contentContainerStyle={{
        flexGrow: 1,
        }}
      ItemSeparatorComponent={<ListSeparator />}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  }
});

export default BlockList;