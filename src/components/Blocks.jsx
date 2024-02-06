import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { getBlocks, addBlock } from '../services/block';

import BlockList from './BlockList';

const Blocks = ({ db }) => {
  const [blockName, setBlockName] = useState('');
  const [blockDesc, setBlockDesc] = useState('');
  const [blockArray, setBlockArray] = useState([ { id: 22, nombre: 'Default', descripcion: 'default' }]);

  useEffect(() => {
    if (db) {
      getBlocks(db, setBlockArray);
    }
  }, []);

  const saveBlock = async () => {
    try {
      await addBlock(db, blockName, blockDesc);
      getBlocks(db, setBlockArray);
    } catch(e) {
      console.log(e.message);
    }
    setBlockName('');
    setBlockDesc('');
  };

  if (!db) return(<View><Text>No database!</Text></View>);

  return(
    <View style={styles.container}>
      <View style={{ flexGrow: 0.5 }}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Nombre de bloque...'
              style={styles.textInput}
              value={blockName}
              onChangeText={(text) => setBlockName(text)}
            />
            <TextInput
              placeholder='Descripción de bloque...'
              style={styles.textInput}
              value={blockDesc}
              onChangeText={(text) => setBlockDesc(text)}
            />
          </View>
          <Pressable style={styles.boton} onPress={saveBlock}>
            <Text style={styles.botonText}>Agregar</Text>
          </Pressable>
        </View>

        <Text style={styles.title}>BLOQUES</Text>

        <BlockList blocks={blockArray} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'lightgray',
    flexGrow: 1,
  },
  form: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  inputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
    rowGap: 10,
  },
  textInput: {
    backgroundColor: 'white',
    // margin: 10,
    padding: 6,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 4,
    alignSelf: 'stretch',
  },
  boton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 4,
    alignSelf: 'center',
    margin: 10,
  },
  botonText: {
    color: 'black',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#883333',
  },
});

export default Blocks;