const db = require("../config/connection");
const {
  AppUser,
  Customer,
  Product,
  Rule,
  CustomerInterest,
} = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("AppUser", "appusers");
    await cleanDB("Rule", "rules");
    await cleanDB("Product", "products");
    await cleanDB("Customer", "customers");
    await cleanDB("CustomerInterest", "customerinterests");

    const appUser1 = await AppUser.create({
      appUserFirstName: "Admin",
      appUserLastName: "Zutshi",
      appUserEmail: "admin@password.com",
      appUserRole: "admin",
      appUserPassword: "password",
    });

    const appUser2 = await AppUser.create({
      appUserFirstName: "Agent",
      appUserLastName: "Kadam",
      appUserEmail: "agentkadam@password.com",
      appUserRole: "agent",
      appUserPassword: "password",
    });

    const appUser3 = await AppUser.create({
      appUserFirstName: "Shulin",
      appUserLastName: "C",
      appUserEmail: "customer@password.com",
      appUserRole: "customer",
      appUserPassword: "password",
    });

    const appUser4 = await AppUser.create({
      appUserFirstName: "Agent",
      appUserLastName: "Doe",
      appUserEmail: "agentdoe@password.com",
      appUserRole: "agent",
      appUserPassword: "password",
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
      productType: "txnacct",
      productDescription: "Transaction Account ",
      rules: [rules[0]._id, rules[1]._id, rules[2]._id, rules[3]._id],
    });

    const product2 = await Product.create({
      productName: "Product2",
      productType: "SAVACCT",
      productDescription: "Savings Account",
      rules: [rules[2]._id, rules[3]._id],
    });

    const product3 = await Product.create({
      productName: "Product3",
      productType: "SAVACCT",
      productDescription: "Super Saver Account",
      rules: [rules[0]._id],
    });

    const product4 = await Product.create({
      productName: "Product4",
      productType: "PLOAN",
      productDescription: "Personal Loan",
      rules: [rules[4]._id],
    });

    console.log("Products seeded");

    await Customer.create({
      customerFirstName: "CustomerFN",
      customerLastName: "CustomerLN",
      customerEmail: "cust1@abc.com",
      customerGender: "male",
      customerOccuptation: "Occuptaion",
      customerSalary: 100,
      customerResidentStatus: "PR",
      customerDateOfBirth: "1983-05-05T09:45:00.000Z",
      isCustomerEligible: "true",
      products: [product1._id],
      createdBy: appUser2._id,
    });

    await Customer.create({
      customerFirstName: "Customer2FN",
      customerLastName: "Customer2LN",
      customerEmail: "cust2@abc.com",
      customerGender: "female",
      customerOccuptation: "Occuptaion",
      customerSalary: 1000,
      customerResidentStatus: "PR",
      customerDateOfBirth: "1993-05-05T09:45:00.000Z",
      isCustomerEligible: "true",
      products: [product2._id],
      createdBy: appUser2._id,
    });

    await Customer.create({
      customerFirstName: "Shulin",
      customerLastName: "C",
      customerEmail: "customer@password.com",
      customerGender: "male",
      customerOccuptation: "Occuptaion",
      customerSalary: 1000,
      customerResidentStatus: "PR",
      customerDateOfBirth: "1983-06-12T09:45:00.000Z",
      isCustomerEligible: "true",
      products: [product1._id, product2._id, product3._id],
      createdBy: appUser2._id,
    });

    await Customer.create({
      customerFirstName: "Customer4FN",
      customerLastName: "Customer4LN",
      customerEmail: "cust4@password.com",
      customerGender: "male",
      customerOccuptation: "Occuptaion",
      customerSalary: 10,
      customerResidentStatus: "VISITORVISA",
      customerDateOfBirth: "2023-05-05T09:45:00.000Z",
      products: [],
      createdBy: appUser2._id,
    });

    console.log("Customers seeded");

    console.log("all done!");

    process.exit(0);
  } catch (err) {
    throw err;
  }
});
