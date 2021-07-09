#!/usr/bin/env node
// @ts-nocheck
const { prompt, Select } = require("enquirer");
const { addPassword, viewAllApps, getPassword } = require("./actions");

const getMasterPassword = async () => {
  const { password } = await prompt([
    {
      type: "password",
      name: "password",
      message: "Enter your Master Password",
    },
  ]);
  return password;
};

const menu = async () => {
  console.log("---------------------------------------------");
  const choice = await new Select({
    name: "choice",
    message: "What do want to do?",
    choices: ["New Password", "View All Apps", "Get Password", "Quit"],
  }).run();
  return choice;
};

const main = async () => {
  const masterPassword = await getMasterPassword();
  if (!masterPassword) return;

  while (true) {
    const choice = await menu();
    switch (choice) {
      case "New Password":
        await addPassword();
        break;

      case "View All Apps":
        await viewAllApps();
        break;

      case "Get Password":
        await getPassword();
        break;

      case "Quit":
        return console.log("Quit");
    }
  }
};

main();
