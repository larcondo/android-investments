export const CREATE_BLOCK_TABLE = `
  CREATE TABLE IF NOT EXISTS blocks (
    id INTEGER PRIMARY KEY NOT NULL,
    nombre TEXT NOT NULL UNIQUE,
    descripcion TEXT
  )
`;

export const ALL_BLOCKS = `
  SELECT * FROM blocks;
`;

export const INSERT_BLOCK = `
  INSERT INTO blocks (nombre, descripcion)
  VALUES (?, ?);
`;