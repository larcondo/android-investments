export const CREATE_FUND_TABLE = `
  CREATE TABLE IF NOT EXISTS funds (
    id INTEGER PRIMARY KEY NOT NULL,
    nombre TEXT NOT NULL UNIQUE,
    descripcion TEXT
  );
`;

export const ALL_FUNDS = `
  SELECT * FROM funds;
`;

export const INSERT_FUND = `
  INSERT INTO funds (nombre, descripcion)
  VALUES (?, ?);
`;