const prompt = require("prompt-sync")({
  autocomplete: false,
  history: false,
});
const { checkRowExists, db, addPassword } = require("./db");
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

const handleViewApps = async () => {
  console.log("viewAllApps");
};

const handleGetPassword = async (masterPassword) => {
  console.log("handleGetPassword");
};

module.exports = {
  handleAddPassword,
  handleViewApps,
  handleGetPassword,
};
