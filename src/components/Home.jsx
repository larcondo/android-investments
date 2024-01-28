import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getSummary } from '../services/database';

const StatPanel = ({ stats }) => {
  if (!stats) return null

  return(
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignSelf: 'stretch' }}>
      <View>
        <Text style={{ fontSize: 40, textAlign: 'center' }}>{ stats.fundsQty }</Text>
        <Text style={{ textAlign: 'center' }}>Fondos</Text>
      </View>
      <View>
        <Text style={{ fontSize: 40, textAlign: 'center' }}>{ stats.blocksQty }</Text>
        <Text style={{ textAlign: 'center' }}>Bloques</Text>
      </View>
    </View>
  );
};


const Home = ({ db }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (db) getSummary(db, setStats);
  }, []);

  if (!db) return(<View><Text>No database!</Text></View>);

  return(
    <View style={styles.container}>
      <View style={{ alignItems: 'center', flexGrow: 0.5 }}>
        <Text style={styles.pageTitle}>HOME</Text>
        
        <StatPanel stats={stats} />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'lightblue',
    flexGrow: 1,
  },
  pageTitle: {
    fontSize: 24,
    padding: 10,
  }
});

export default Home;