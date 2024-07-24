const db = require("../config/connection");
const { AppUser, Customer, Product, Rule } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("AppUser", "appusers");
    await cleanDB("Rule", "rules");
    await cleanDB("Product", "products");
    await cleanDB("Customer", "customers");

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

    const rules = await Rule.insertMany([
      {
        ruleName: "ageRule1",
        ruleOperandField: "customerAge",
        ruleOperator: "greater",
        ruleValue: "18",
      },
      {
        ruleName: "ageRule2",
        ruleOperandField: "customerAge",
        ruleOperator: "greater",
        ruleValue: "30",
      },
      {
        ruleName: "salaryRule3",
        ruleOperandField: "customerSalary",
        ruleOperator: "greater",
        ruleValue: "100",
      },
      {
        ruleName: "residentStatusRule4",
        ruleOperandField: "customerResidentStatus",
        ruleOperator: "equals",
        ruleValue: "CITIZEN",
      },
      {
        ruleName: "forWomenRule4",
        ruleOperandField: "customerGender",
        ruleOperator: "equals",
        ruleValue: "female",
      },
    ]);

    console.log("Rules seeded");

    const product1 = await Product.create({
      productName: "Product1",
      productType: "productType",
      productDescription: "DummyProduct",
      rules: [rules[0]._id, rules[1]._id, rules[2]._id, rules[3]._id],
    });

    const product2 = await Product.create({
      productName: "Product2",
      productType: "productType",
      productDescription: "DummyProduct",
      rules: [rules[2]._id, rules[3]._id],
    });

    const product3 = await Product.create({
      productName: "Product3",
      productType: "productType",
      productDescription: "DummyProduct",
      rules: [rules[0]._id],
    });

    console.log("Products seeded");

    await Customer.create({
      customerFirstName: "CustomerFN",
      customerLastName: "CustomerLN",
      customerEmail: "abcd@abc.com",
      customerGender: "male",
      customerOccuptation: "Occuptaion",
      customerSalary: 100,
      customerResidentStatus: "PR",
      customerDateOfBirth: "1983-05-05T09:45:00.000Z",
      products: [product1._id],
    });

    await Customer.create({
      customerFirstName: "Customer2FN",
      customerLastName: "Customer2LN",
      customerEmail: "abcd2@abc.com",
      customerGender: "female",
      customerOccuptation: "Occuptaion",
      customerSalary: 1000,
      customerResidentStatus: "PR",
      customerDateOfBirth: "1983-05-05T09:45:00.000Z",
      products: [product2._id],
    });

    await Customer.create({
      customerFirstName: "Customer3FN",
      customerLastName: "Customer3LN",
      customerEmail: "abcd3@abc.com",
      customerGender: "female",
      customerOccuptation: "Occuptaion",
      customerSalary: 1000,
      customerResidentStatus: "PR",
      customerDateOfBirth: "1983-05-05T09:45:00.000Z",
      products: [product1._id, product2._id, product3._id],
    });

    console.log("Customers seeded");

    console.log("all done!");

    process.exit(0);
  } catch (err) {
    throw err;
  }
});
