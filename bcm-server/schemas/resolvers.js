const { AppUser, Customer, Product, Rule } = require("../models");
const { signToken } = require("../utils/jwtAuth");
const { GraphQLError } = require("graphql");
const nodemailer = require("nodemailer");

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
      const countOfProductsLinkedToRule = await Product.countDocuments({
        rules: ruleId,
      });

      if (countOfProductsLinkedToRule !== 0) {
        throw new GraphQLError(
          `Rule cannot be deleted as ${countOfProductsLinkedToRule} products are linked `,
          {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          }
        );
      }

      const rule = await Rule.findOneAndDelete({ _id: ruleId });
      if (!rule) {
        throw new GraphQLError("No rule with that id", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      return rule;
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
    updateProduct: async (
      parent,
      {
        productId,
        productName,
        productType,
        productDescription,
        isCustomerInterested,
        rules,
      }
    ) => {
      if (Array.isArray(rules) && rules.length === 0) {
        throw new GraphQLError(
          "Cannot update a product without atleast 1 rule",
          {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          }
        );
      }
      const product = await Product.findOneAndUpdate(
        { _id: productId },
        {
          $set: {
            productName,
            productType,
            productDescription,
            isCustomerInterested,
            rules,
          },
        },
        { runValidators: true, new: true }
      );

      if (!product) {
        throw new GraphQLError("No Product with that id", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      return product;
    },
    sendEmail: async (parent, { email }) => {
      console.log({ email });
      let emailResponseMessage;
      const transporter = nodemailer.createTransport({
        // host: process.env.SMTP_HOST,
        // port: process.env.SMTP_PORT,
        // secure: false, // Use `true` for port 465, `false` for all other ports
        service: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      let mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: "Sending Email using Node.js",
        text: "My First Trial Email!",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          emailResponseMessage = "Error Sending Email";
        } else {
          console.log("Email sent: " + info.response);
          emailResponseMessage = "Sent EMail";
        }
      });

      return emailResponseMessage;
    },
\    addCustomer: async (parent, args) => {
      const customer = await Customer.create(args);
      return customer;
    },
  },
};

module.exports = resolvers;
