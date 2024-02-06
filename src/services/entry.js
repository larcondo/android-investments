import {
  CREATE_ENTRY_TABLE,
  ALL_ENTRIES, INSERT_ENTRY,
  ENTRIES_BY_BLOCK,
  ENTRY_BY_ID,
  DELETE_ENTRY_BY_ID,
} from '../queries/entries';

const errorCb = (err) => console.error(err.message);

export function createEntriesTable(db) {
  db.transaction((tx) => {
    tx.executeSql(CREATE_ENTRY_TABLE, [], () => console.log('Entries table'), errorCb);
  });
}

export function getEntries(db, successFn) {
  db.transaction((tx) => {
    tx.executeSql(ALL_ENTRIES,
      [],
      (_, { rows: { _array } }) => successFn(_array),
      errorCb
    );
  });
}

export function getEntriesByBlock(db, blockId, successFn) {
  db.transaction((tx) => {
    tx.executeSql(ENTRIES_BY_BLOCK,
      [blockId],
      (_, { rows: { _array } }) => successFn(_array),
      errorCb
    );
  });
}

export function getEntryById(db, id, successFn) {
  db.transaction((tx) => {
    tx.executeSql(ENTRY_BY_ID,
      [id],
      (_, { rows: { _array } }) => successFn(_array),
      errorCb
    );
  });
}

export function addEntry(db, fundId, blockId, fecha, valor) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        INSERT_ENTRY,
        [fundId, blockId, fecha, valor],
        resolve,
        reject
      );
    });
  });
}

export function removeEntry(db, id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        DELETE_ENTRY_BY_ID,
        [id],
        resolve,
        reject
      );
    });
  });
}