const prompt = require("prompt-sync")();
const {
  checkRowExists,
  addPassword,
  getPassword,
  getAllApps,
 deletePassword,
} = require("./db");
const { encrypt, generateSecretKey, decrypt } = require("./encrypt-decrypt");

const primaryEmail = "mani@gmail.com";

const handleAddPassword = async (masterPassword) => {
  try {
    const app = prompt("Enter App Name: ").toLowerCase();
    const email = prompt(`Enter email (${primaryEmail}): `, {
      value: primaryEmail,
    }).toLowerCase();
    const prevId = await checkRowExists(app, email);
    if (prevId) {
      return console.log(
        `Record with '${app}' and '${email}' already exists with an id ${prevId}`
      );
    }

    const password = prompt(`Enter password: `, { echo: "*" });
    const secretKey = generateSecretKey(masterPassword, app, email);
    const encryptedPassword = encrypt(password, secretKey);
    const recordId = await addPassword(app, email, encryptedPassword);
    if (recordId) {
      console.log(`Added Record with an id: ${recordId}`);
    }
  } catch (e) {
    console.log("Error: ", e.message);
  }
};

const handleGetPassword = async (masterPassword) => {
  try {
    const idOrApp = prompt("Enter App Name or Id: ").toLowerCase();
    const rows = await getPassword(idOrApp);

    if (!rows) {
      return console.log(`No Record found`);
    }

    let index = 0;
    if (rows.length > 1) {
      const transormedRows = rows.map(({ app, email }) => ({ app, email }));
      console.table(transormedRows);
      index = parseInt(prompt("choose an index: "));
    }

    let row = rows[index];
    const secretKey = generateSecretKey(masterPassword, row.app, row.email);
    const decryptedPassword = decrypt(row.password, secretKey);
    if (decryptedPassword) {
      console.log(decryptedPassword);
    }
  } catch (e) {
    console.log("Error: ", e.message);
  }
};

const handleViewApps = async () => {
  try {
    const rows = await getAllApps();
    console.table(rows);
  } catch (e) {
    console.log("Error: ", e.message);
  }
};

const handleDeletePassword = async () => {
  try {
    const id = prompt("Enter Id to delete: ").toLowerCase();
    const deletedRow = await deletePassword(id);
    if(deletedRow)
      console.log(`deleted record (${deletedRow.app}', '${deletedRow.email}')`);
    else
      console.log("Unable to delete ID might be wrong");

  } catch (e) {
    console.log("Error: ", e.message);
  }
};

module.exports = {
  handleAddPassword,
  handleViewApps,
  handleGetPassword,
  handleDeletePassword
};
