const { Client } = require("pg");

const db = new Client({
  connectionString: "postgresql://postgres:1234@localhost:5432/reveal",
});
db.connect();

const checkRowExists = async (app, email) => {
  let query = `select * from passwords where app = $1 and email = $2;`;
  const { rows } = await db.query(query, [app, email]);
  const [row] = rows;
  if (row) return row.id;
  return null;
};

const addPassword = async (app, email, password) => {
  let query = `insert into passwords values(DEFAULT,$1,$2,$3) returning id;`;
  let replacements = [app, email, password];
  const { rows } = await db.query(query, replacements);
  const [row] = rows;
  if (row) return row.id;
  return null;
};

const getAllApps = async () => {
  let query = `select id, app, email, timestamp from passwords order by app asc`;
  const { rows } = await db.query(query);
  return rows;
};

const getPassword = async (idOrApp) => {
  const isId = !isNaN(idOrApp);
  let query = `select * from passwords where ${isId ? "id" : "app"} = $1;`;
  const { rows } = await db.query(query, [idOrApp]);
  if (rows.length) return rows;
  return null;
};

module.exports = { checkRowExists, db, addPassword, getPassword, getAllApps };
