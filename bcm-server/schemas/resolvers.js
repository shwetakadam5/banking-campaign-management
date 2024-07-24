const { AppUser, Customer, Product, Rule } = require("../models");
const { signToken } = require("../utils/jwtAuth");
const { GraphQLError } = require("graphql");

const resolvers = {
  Query: {
    appUsers: async () => {
      return await AppUser.find();
    },
    customers: async () => {
      const customers = await Customer.find({}).populate("products").populate({
        path: "products",
        populate: "rules",
      });
      console.log(customers);
      return customers;
    },
    products: async () => {
      return await Product.find({}).populate("rules");
    },
    rules: async () => {
      return await Rule.find({});
    },
  },
  Mutation: {
    login: async (parent, { appUserEmail, appUserPassword }) => {
      const appUserDetails = await AppUser.findOne({ appUserEmail });

      if (!appUserDetails) {
        throw new GraphQLError("Could not authenticate user.Invalid Username", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      const validPassword = await appUserDetails.isCorrectPassword(
        appUserPassword
      );

      if (!validPassword) {
        throw new GraphQLError(
          "Could not authenticate user. Invalid Password",
          {
            extensions: {
              code: "UNAUTHENTICATED",
            },
          }
        );
      }

      const token = signToken(appUserDetails);

      return { token, appUserDetails };
    },
    addRule: async (parent, args) => {
      const rule = await Rule.create(args);
      return rule;
    },
    deleteRule: async (parent, { ruleId }) => {
      return Rule.findOneAndDelete({ _id: ruleId });
    },
    addProduct: async (parent, args) => {
      if (Array.isArray(args.rules) && args.rules.length === 0) {
        throw new GraphQLError("Cannot add a product without any rule", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      for (let index = 0; index < args.rules.length; index++) {
        const element = args.rules[index];
        const rule = await Rule.findById({
          _id: element,
        });
        if (rule == null) {
          throw new GraphQLError(
            "Rule does not exist.Cannot add a product with invalid rule",
            {
              extensions: {
                code: "BAD_USER_INPUT",
              },
            }
          );
        }
      }

      const product = await Product.create(args);
      return product;
    },
  },
};

module.exports = resolvers;
