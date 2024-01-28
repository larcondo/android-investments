import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';
import {
  CREATE_TABLES, ALL_USERS, INSERT_USER,
  REMOVE_USER_BY_NAME,
  SUMMARY,
} from './queries';
import { CREATE_FUND_TABLE, ALL_FUNDS, INSERT_FUND } from './funds';
import { CREATE_BLOCK_TABLE, ALL_BLOCKS, INSERT_BLOCK } from './blocks';
import { CREATE_ENTRY_TABLE, ALL_ENTRIES, INSERT_ENTRY, ENTRIES_BY_BLOCK, DEFAULT_ENTRIES } from './entries';

const DATABASE_NAME = 'db.db';

const errorCb = (err) => console.error(err.message);
const successCb = () => {};
const tableOkCb = () => console.log('Tabla users ok!');

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
};

export function createTables(db) {
  db.transaction((tx) => {
    tx.executeSql(CREATE_TABLES, [], tableOkCb, errorCb);
  });
};

export function createFundsTable(db) {
  db.transaction((tx) => {
    tx.executeSql(CREATE_FUND_TABLE, [], () => console.log('Funds table'), errorCb);
  });
};

export function createBlocksTable(db) {
  db.transaction((tx) => {
    tx.executeSql(CREATE_BLOCK_TABLE, [], () => console.log('Blocks table'), errorCb);
  });
};

export function createEntriesTable(db) {
  db.transaction((tx) => {
    tx.executeSql(CREATE_ENTRY_TABLE, [], () => console.log('Entries table'), errorCb);
  });
}

export function getUsers(db) {
  let users = null;

  db.transaction((tx) => {
    tx.executeSql(ALL_USERS,
      [],
      (_, { rows: { _array}}) => users = _array,
      errorCb
    )
  });

  return users;
};

export function getFunds(db, successFn) {
  db.transaction((tx) => {
    tx.executeSql(ALL_FUNDS,
      [],
      (_, { rows: { _array }}) => {
        successFn(_array);
      },
      errorCb
    )
  });
};

export function getBlocks(db, successFn) {
  db.transaction((tx) => {
    tx.executeSql(ALL_BLOCKS,
      [],
      (_, { rows: { _array }}) => {
        successFn(_array);
      },
      errorCb
    )
  });
};

export function getEntries(db, successFn) {
  db.transaction((tx) => {
    tx.executeSql(ALL_ENTRIES,
      [],
      (_, { rows: { _array }}) => successFn(_array),
      errorCb
    )
  });
};

export function getEntriesByBlock(db, blockId, successFn) {
  db.transaction((tx) => {
    tx.executeSql(ENTRIES_BY_BLOCK,
      [blockId],
      (_, { rows: { _array }}) => successFn(_array),
      errorCb
    )
  });
};

export function getSummary(db, successFn) {
  db.transaction((tx) => {
    tx.executeSql(SUMMARY,
      [],
      (_, { rows: { _array }}) => {
        successFn(_array[0]);
      },
      errorCb
    )
  });
}

export function addUser(db, username) {
  db.transaction((tx) => {
    tx.executeSql(INSERT_USER, [username, 'sekret'], successCb, errorCb);
  });
};

export function addFund(db, nombre, desc) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(INSERT_FUND, [nombre, desc], resolve, reject);
    });
  })
};

export function addBlock(db, nombre, desc) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(INSERT_BLOCK, [nombre, desc], resolve, reject);
    });
  });
};

export function addEntry(db, fundId, blockId, fecha, valor) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        INSERT_ENTRY,
        [fundId, blockId, fecha, valor],
        resolve,
        reject
      );
    })
  });
};

export function defaultEntries(db) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(DEFAULT_ENTRIES, [], resolve, reject);
    });
  });
};

export function removeUser(db, username) {
  db.transaction((tx) => {
    tx.executeSql(REMOVE_USER_BY_NAME, [username],
      successCb,
      errorCb
    )
  });
};