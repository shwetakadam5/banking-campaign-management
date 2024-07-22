const { AppUser, Customer } = require("../models");

const resolvers = {
  Query: {
    appUsers: async () => {
      return AppUser.find();
    },
    customers: async () => {
      return Customer.find();
    },
  },
};

module.exports = resolvers;
