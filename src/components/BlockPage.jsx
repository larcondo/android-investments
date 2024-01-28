import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useParams, Link } from 'react-router-native';
import {
  getEntriesByBlock,
  getFunds,
  addEntry,
} from '../services/database';
import { useEffect, useState } from 'react';

import EntryList from './EntryList';
import Dropdown from './Dropdown';

const BlockPage = ({ db }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [fundId, setFundId] = useState(1);
  const [entryDate, setEntryDate] = useState('');
  const [entryValue, setEntryValue] = useState('');
  const [funds, setFunds] = useState([]);
  const [entries, setEntries] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  const mapOptions = ( array ) => {
    const newArray = array.map(f => {
      return { value: f.id, label: f.nombre };
    });
    setFunds( newArray );
  };

  useEffect(() => {
    if(db && id) {
      getEntriesByBlock(db, id, setEntries);
      getFunds(db, mapOptions);
      setTimeout(() => setLoading(false), 250);
    }
  }, [id]);

  const submit = async () => {
    if (fundId === '') return null;
    if (entryDate === '' || entryValue === '') return null;

    try {
      await addEntry(db, fundId, id, entryDate, entryValue);
      getEntriesByBlock(db, id, setEntries);
    } catch(e) {
      console.log(e);
    }
  };

  if (!db) return(<View><Text>No database!</Text></View>);
  if (!id) return null;

  if (loading) return <View style={{ flex: 1, justifyContent: 'center' }}>
    <ActivityIndicator size='large' color='#00137F' />
  </View>;

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Link to={'/blocks'} style={styles.link} underlayColor={'#f5f5f5'}>
          <Text>← VOLVER</Text>
        </Link>

        <Text style={styles.headerTitle} numberOfLines={1}>Block: { id }</Text>
      </View>

      { !formVisible && <Pressable style={[styles.boton, { alignSelf: 'stretch', margin: 20 }]} onPress={() => setFormVisible(true)}>
        <Text style={styles.botonText}> + Agregar</Text>
      </Pressable> }

      { formVisible && <View style={styles.form}>

        <Dropdown value={fundId} items={funds} onValueChange={setFundId} />

        <TextInput
          placeholder='YYYY-MM-DD'
          value={entryDate}
          onChangeText={(text) => setEntryDate(text)}
          style={styles.input}
        />
        <TextInput
          placeholder='0.0'
          inputMode='numeric'
          value={entryValue}
          onChangeText={(text) => setEntryValue(text)}
          style={styles.input}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', gap: 10, paddingVertical: 20, }}>
          <Pressable style={[styles.boton, { backgroundColor: 'lightgray', flexGrow: 1 }]}>
            <Text style={styles.botonText} onPress={() => setFormVisible(false)}>Cancelar</Text>
          </Pressable>
          <Pressable style={[styles.boton, { flexGrow: 1 }]} onPress={submit} >
            <Text style={styles.botonText}>Agregar entrada</Text>
          </Pressable>
        </View>

        <Text style={styles.query}>
          INSERT VALUES ({id}, {fundId}, {entryDate}, {entryValue});
        </Text>

      </View>}

      <EntryList entries={entries} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'column',
  },
  headerTitle: {
    flexGrow: 1,
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
  link: {
    padding: 20,
    // backgroundColor: 'lightblue',
    alignSelf: 'flex-start',
  },
  form: {
    margin: 10,
    padding: 10,
  },
  query: {
    backgroundColor: 'lemonchiffon',
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    margin: 10,
    fontSize: 16,
    textAlign: 'right'
  },
  boton: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    alignSelf: 'center',
  },
  botonText: {
    textAlign: 'center',
  }
});

export default BlockPage;