const db = require("../config/connection");
const { AppUser } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("AppUser", "appusers");

    await AppUser.create({
      appUserName: "Shiv",
    });

    await AppUser.create({
      appUserName: "Shweta",
    });

    console.log("AppUsers seeded");

    console.log("all done!");

    process.exit(0);
  } catch (err) {
    throw err;
  }
});
