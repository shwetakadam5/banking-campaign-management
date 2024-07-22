const db = require("../config/connection");
const { AppUser, Customer } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("AppUser", "appusers");

    await AppUser.create({
      appUserFirstName: "Shiv",
      appUserLastName: "Zutshi",
      appUserEmail: "shivzutshi@password.com",
      appUserRole: "admin",
      appUserPassword: "password123",
    });

    await AppUser.create({
      appUserFirstName: "Shweta",
      appUserLastName: "Kadam",
      appUserEmail: "shwetakadam@password.com",
      appUserRole: "agent",
      appUserPassword: "password123",
    });

    await AppUser.create({
      appUserFirstName: "Shulin",
      appUserLastName: "Z",
      appUserEmail: "shulin@password.com",
      appUserRole: "customer",
      appUserPassword: "password123",
    });

    console.log("AppUsers seeded");

    await cleanDB("Customer", "customers");

    await Customer.create({
      customerFirstName: "CustomerFN",
      customerLastName: "CustomerLN",
      customerEmail: "abcd@abc.com",
      customerGender: "male",
      customerOccuptation: "Occuptaion",
      customerSalary: 100,
      customerResidentStatus: "PR",
      customerDateOfBirth: "1983-05-05T09:45:00.000Z",
    });

    console.log("Customers seeded");

    console.log("all done!");

    process.exit(0);
  } catch (err) {
    throw err;
  }
});
