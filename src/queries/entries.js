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
  WHERE block_id=? ORDER BY fecha ASC
`;

export const ENTRY_BY_ID = `
  SELECT
  entries.id, entries.fecha, entries.valor, entries.block_id,
  funds.nombre AS fund,
  blocks.nombre AS block
  FROM entries
  JOIN funds ON entries.fund_id=funds.id
  JOIN blocks ON entries.block_id=blocks.id
  WHERE entries.id=? LIMIT 1;
`;

export const INSERT_ENTRY = `
  INSERT INTO entries (fund_id, block_id, fecha, valor)
  VALUES (?, ?, ?, ?)
`;

export const DELETE_ENTRY_BY_ID = `
  DELETE FROM entries WHERE id=?;
`;