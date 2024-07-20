const { AppUser } = require("../models");

const resolvers = {
  Query: {
    appUsers: async () => {
      return AppUser.find();
    },
  },
};

module.exports = resolvers;
