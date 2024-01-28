import { StyleSheet, Text, FlatList } from 'react-native';

import EntryItem from './EntryItem';
import ListSeparator from './ListSeparator';

const EntryList = ({ entries }) => {
  if (!entries || entries.length < 1) return <Text>No hay entradas actualmente...</Text>;

  return(
    <FlatList
      data={entries}
      keyExtractor={item => item.id}
      renderItem={({item}) => <EntryItem entry={item} />}
      style={styles.list}
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

export default EntryList;