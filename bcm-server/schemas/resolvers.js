const { AppUser, Customer, Product, Rule } = require("../models");

const resolvers = {
  Query: {
    appUsers: async () => {
      return AppUser.find();
    },
    customers: async () => {
      const customers = await Customer.find({}).populate("products");
      console.log(customers);
      return customers;
    },
    products: async () => {
      return Product.find({}).populate("rules");
    },
    rules: async () => {
      return Rule.find({});
    },
  },
};

module.exports = resolvers;
