const { AppUser, Customer, Product, Rule } = require("../models");

const resolvers = {
  Query: {
    appUsers: async () => {
      return AppUser.find();
    },
    customers: async () => {
      return Customer.find();
    },
    products: async () => {
      return Product.find();
    },
    rules: async () => {
      return Rule.find();
    },
  },
};

module.exports = resolvers;
