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

module.exports = { checkRowExists, db, addPassword };
