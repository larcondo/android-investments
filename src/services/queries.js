export const CREATE_TABLES = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  );
`;

export const SUMMARY = `
  SELECT 
  (SELECT COUNT(*) FROM funds) AS fundsQty,
  (SELECT COUNT(*) FROM blocks) As blocksQty;
`;

export const ALL_USERS = `
  SELECT * FROM users;
`;

export const INSERT_USER = `
  INSERT INTO users (name, password)
  VALUES (?, ?)
`;

export const REMOVE_USER_BY_NAME = `
  DELETE FROM users WHERE username = ?
`;