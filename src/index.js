#!/usr/bin/env node
const prompt = require("prompt-sync")();
const {
  handleAddPassword,
  handleViewApps,
  handleGetPassword,
  handleDeletePassword
} = require("./actions");

const menu = async () => {
  console.log("\n------------------------------------------");
  console.log("1. Add   2. View Apps   3. Get   4. Delete ");
  const choice = prompt(": ");
  return choice;
};

const main = async () => {
  const masterPassword = prompt("Master Password: ", { echo: "*" });
  if (!masterPassword) return;

  while (true) {
    const choice = await menu();
    switch (choice) {
      case "1":
        await handleAddPassword(masterPassword);
        break;

      case "2":
        await handleViewApps();
        break;

      case "3":
        await handleGetPassword(masterPassword);
        break;

      case "4":
        await handleDeletePassword(masterPassword);
        break;

      default:
        process.exit();
    }
  }
};

main();
