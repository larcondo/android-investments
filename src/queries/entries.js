export const CREATE_ENTRY_TABLE = `
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY NOT NULL,
    fund_id INTEGER NOT NULL,
    block_id INTEGER NOT NULL,
    fecha TEXT NOT NULL,
    valor REAL NOT NULL
  );
`;

export const ALL_ENTRIES = `
  SELECT * FROM entries;
`;

export const ENTRIES_BY_BLOCK = `
  SELECT entries.*, funds.nombre AS fund 
  FROM entries JOIN funds ON entries.fund_id=funds.id
  WHERE block_id=? ORDER BY fecha DESC
`;

export const INSERT_ENTRY = `
  INSERT INTO entries (fund_id, block_id, fecha, valor)
  VALUES (?, ?, ?, ?)
`;

export const DELETE_ENTRY_BY_ID = `
  DELETE FROM entries WHERE id=?;
`;