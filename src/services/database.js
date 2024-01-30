import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import { SUMMARY } from '../queries/general';

const DATABASE_NAME = 'db.db';

const errorCb = (err) => console.error(err.message);

export function openDatabase() {
  if (Platform.OS === 'web') {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase(DATABASE_NAME);
  return db;
}

export function getSummary(db, successFn) {
  db.transaction((tx) => {
    tx.executeSql(SUMMARY,
      [],
      (_, { rows: { _array } }) => {
        successFn(_array[0]);
      },
      errorCb
    );
  });
}