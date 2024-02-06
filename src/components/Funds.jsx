import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { getFunds, addFund } from '../services/fund';

import FundList from './FundList';

const Funds = ({ db }) => {
  const [fundName, setFundName] = useState('');
  const [fundDesc, setFundDesc] = useState('');
  const [fundArray, setFundArray] = useState([]);

  useEffect(() => {
    getFunds(db, setFundArray);
  }, []);

  const saveFund = async () => {
    try {
      await addFund(db, fundName, fundDesc);
      getFunds(db, setFundArray);
    } catch(e) {
      console.log(e);
    }
    setFundName('');
    setFundDesc('');
  };

  if (!db) return(<View><Text>No database!</Text></View>);

  return(
    <View style={styles.container}>
      <View style={{ flexGrow: 0.5 }}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Nombre de fondo...'
              style={styles.textInput}
              value={fundName}
              onChangeText={(text) => setFundName(text)}
            />
            <TextInput
              placeholder='Descripción de fondo...'
              style={styles.textInput}
              value={fundDesc}
              onChangeText={(text) => setFundDesc(text)}
            />
          </View>
          <Pressable style={styles.boton} onPress={saveFund}>
            <Text>Agregar</Text>
          </Pressable>
        </View>

        <Text style={styles.title}>FONDOS</Text>

        <FundList funds={fundArray} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  form: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
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
  },
  boton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 4,
    alignSelf: 'center',
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#883333',
  },
});

export default Funds;