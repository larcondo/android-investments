import {
  CREATE_FUND_TABLE,
  ALL_FUNDS,
  INSERT_FUND
} from '../queries/funds';

const errorCb = (err) => console.error(err.message);

export function createFundsTable(db) {
  db.transaction((tx) => {
    tx.executeSql(CREATE_FUND_TABLE, [], () => console.log('Funds table'), errorCb);
  });
}

export function getFunds(db, successFn) {
  db.transaction((tx) => {
    tx.executeSql(ALL_FUNDS,
      [],
      (_, { rows: { _array } }) => {
        successFn(_array);
      },
      errorCb
    );
  });
}

export function addFund(db, nombre, desc) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(INSERT_FUND, [nombre, desc], resolve, reject);
    });
  });
}