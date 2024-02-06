import { View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-native';
import { getEntryById, removeEntry } from '../services/entry';
import { fechaToString, currency } from '../utils/general';

const EntryPage = ({ db }) => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if ( db && id ) {
      getEntryById(db, id, (array) => setEntry(array[0]));
    }
  }, []);

  const remove = async () => {
    try {
      await removeEntry(db, id);
      navigate(`/block/${entry.block_id}`);
    } catch(e) {
      console.log(e);
    }
  };

  const showAlert = () => {
    Alert.alert(
      'Eliminar entrada',
      '¿Confirma la eliminación de la entrada?',
      [
        { text: 'NO', style: 'cancel' },
        { text: 'SI', onPress: () => remove(), style: 'default' },
      ]
    );
  };

  if (!db) return(<View><Text>No database!</Text></View>);
  if (!id) return <Text>No id</Text>;

  if (!entry) return <Text>No entry</Text>;

  return(
    <View style={styles.container}>
      <View style={{ padding: 20 }}>
        <Text style={styles.fecha}>{ fechaToString(entry.fecha) }</Text>
        <Text style={styles.valor}>{ currency(entry.valor) }</Text>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.fundText}>Fondo:</Text>
          <Text style={styles.fundValue}>{ entry?.fund }</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.blockText}>Bloque:</Text>
          <Text style={styles.blockValue}>{ entry?.block }</Text>
        </View>
      </View>
      <Text style={{ textAlign: 'right', alignSelf: 'center' }}>id: { entry.id }</Text>

      <View style={styles.botonContainer}>
        <Link to={`/block/${entry.block_id}`} style={styles.link} underlayColor='#0BED9E'>
          <Text style={styles.linkText}>Volver a bloques</Text>
        </Link>

        <Pressable style={styles.boton} onPress={showAlert}>
          <Text style={styles.botonText}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  fecha: {
    color: '#888',
    textAlign: 'center',
    fontSize: 18,
  },
  valor: {
    paddingVertical: 10,
    fontSize: 30,
    textAlign: 'center',
  },
  fundText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
  fundValue: {
    fontSize: 20,
    textAlign: 'center',
  },
  blockText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
  blockValue: {
    fontSize: 20,
    textAlign: 'center',
  },
  botonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  link: {
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 10,
  },
  linkText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'green',
  },
  boton: {
    backgroundColor: 'palevioletred',
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 10,
  },
  botonText: {
    color: 'white',
    fontSize: 18,
  }
});

export default EntryPage;