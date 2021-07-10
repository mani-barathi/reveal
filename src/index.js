#!/usr/bin/env node
const prompt = require("prompt-sync")();
const {
  handleAddPassword,
  handleViewApps,
  handleGetPassword,
} = require("./actions");

const menu = async () => {
  console.log("\n------------------------------------------");
  console.log("1. Add Password    2. View Apps    3. Get Password");
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

      default:
        process.exit();
    }
  }
};

main();
