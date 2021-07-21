const { Client } = require("pg");

const db = new Client({
  connectionString: "postgresql://postgres:1234@localhost:5432/reveal",
});
db.connect();

const checkRowExists = async (app, email) => {
  let query = `SELECT * FROM passwords WHERE app = $1 AND email = $2;`;
  const { rows } = await db.query(query, [app, email]);
  const [row] = rows;
  if (row) return row.id;
  return null;
};

const addPassword = async (app, email, password) => {
  let query = `INSERT INTO passwords values(DEFAULT,$1,$2,$3) returning id;`;
  let replacements = [app, email, password];
  const { rows } = await db.query(query, replacements);
  const [row] = rows;
  if (row) return row.id;
  return null;
};

const getAllApps = async () => {
  let query = `SELECT id, app, email, timestamp FROM passwords ORDER BY app ASC`;
  const { rows } = await db.query(query);
  return rows;
};

const getPassword = async (idOrApp) => {
  const isId = !isNaN(idOrApp);
  let query = `SELECT * FROM passwords WHERE ${isId ? "id" : "app"} = $1;`;
  const { rows } = await db.query(query, [idOrApp]);
  if (rows.length) return rows;
  return null;
};

const deletePassword = async (id) => {
  let query = `delete from passwords where id = $1 returning app, email`;
  const {rows} = await db.query(query, [id]);
  if (rows.length === 1) return rows[0];
  return false;
};

module.exports = { checkRowExists, db, addPassword, getPassword, getAllApps, deletePassword };
