import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import { openDatabase } from '../services/database';
import { createFundsTable } from '../services/fund';
import { createBlocksTable } from '../services/block';
import { createEntriesTable } from '../services/entry';
import { useEffect } from 'react';

import AppBar from './AppBar';
import Home from './Home';
import Funds from './Funds';
import Blocks from './Blocks';
import BlockPage from './BlockPage';
import EntryPage from './EntryPage';

const db = openDatabase();

const Main = () => {
  useEffect(() => {
    createFundsTable(db);
    createBlocksTable(db);
    createEntriesTable(db);
  }, []);

  return(
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<Home db={db} />} />
        <Route path='/funds' element={<Funds db={db} />} />
        <Route path='/blocks' element={<Blocks db={db} />} />
        <Route path='/block/:id' element={<BlockPage db={db} /> } />
        <Route path='/entry/:id' element={<EntryPage db={db} /> } />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default Main;