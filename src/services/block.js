import { CREATE_BLOCK_TABLE, ALL_BLOCKS, INSERT_BLOCK } from '../queries/blocks';

const errorCb = (err) => console.error(err.message);

export function createBlocksTable(db) {
  db.transaction((tx) => {
    tx.executeSql(CREATE_BLOCK_TABLE, [], () => console.log('Blocks table'), errorCb);
  });
}

export function getBlocks(db, successFn) {
  db.transaction((tx) => {
    tx.executeSql(ALL_BLOCKS,
      [],
      (_, { rows: { _array } }) => {
        successFn(_array);
      },
      errorCb
    );
  });
}

export function addBlock(db, nombre, desc) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(INSERT_BLOCK, [nombre, desc], resolve, reject);
    });
  });
}