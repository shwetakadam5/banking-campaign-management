const {
  AppUser,
  Customer,
  Product,
  Rule,
  CustomerInterest,
} = require("../models");
const { signToken } = require("../utils/jwtAuth");
const { GraphQLError } = require("graphql");
const nodemailer = require("nodemailer");
const {
  calculateCustomerAge,
  sendEmailMessage,
  generatePassword,
} = require("../utils/helper");

const { ObjectId } = require("mongodb");
const resolvers = {
  Query: {
    appUsers: async () => {
      return await AppUser.find();
    },
    customers: async () => {
      const customers = await Customer.find({})
        .populate("products")
        .populate({
          path: "products",
          populate: "rules",
        })
        .populate("interestedProducts")
        .populate({
          path: "interestedProducts",
          populate: "products",
        })
        .populate("createdBy");
      return customers;
    },
    products: async (parent, { productName, productType }) => {
      const params = {};

      if (productName) {
        params.productName = {
          $regex: productName,
        };
      }

      if (productType) {
        params.productType = {
          $regex: productType,
        };
      }

      return await Product.find(params).populate("rules");
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("rules");
    },
    rules: async () => {
      return await Rule.find({});
    },
    rule: async (parent, { _id }) => {
      return await Rule.findById(_id);
    },
    customersProducts: async (parent, args, context) => {
      if (context.user) {
        // //for unittesting
        // const customer = await Customer.findById("66a395230797e0aa3da88a7f")
        const customer = await Customer.findById(context.user._id)
          .populate("products")
          .populate({
            path: "products",
            populate: "rules",
          })
          .populate("interestedProducts")
          .populate({
            path: "interestedProducts",
            populate: "products",
          })
          .populate("createdBy");

        return customer;
      }

      throw new GraphQLError("Could not authenticate user.", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
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
      { productId, productName, productType, productDescription, rules }
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
      const emailSubject = "Sending Email using Node.js";
      const emailMessage = "My First Trial Email!";

      const emailResponseMessage = sendEmailMessage(
        email,
        emailSubject,
        emailMessage
      );

      return emailResponseMessage;
    },
    addCustomer: async (parent, args, context) => {
      // if (context.user) {
      const {
        customerFirstName,
        customerLastName,
        customerEmail,
        customerGender,
        customerOccupation,
        customerSalary,
        customerResidentStatus,
        customerDateOfBirth,
        // products,
      } = args;
      let isCustomerEligible = "false";
      let products = [];

      const customerAge = calculateCustomerAge(customerDateOfBirth);
      const generatedPassword = generatePassword(
        customerFirstName,
        customerDateOfBirth
      );

      //fetch all the products

      const productList = await Product.find({}).populate("rules");

      let applicableProducts = [];

      // loop through the products and the rules under each product and check against the customer values.
      //if all rules match then the products are applicable.
      for (let pindex = 0; pindex < productList.length; pindex++) {
        const rules = productList[pindex].rules;
        let rulesCounter = 0;
        // console.log(rules.length);
        // console.log(rulesCounter);
        for (let index = 0; index < rules.length; index++) {
          let eachRule = rules[index];
          let fieldName = eachRule.ruleOperandField;
          let fieldValue = eachRule.ruleValue;

          if (eachRule.ruleOperator === "equals") {
            if (fieldName === "customerFirstName") {
              if (customerFirstName === fieldValue) {
                rulesCounter++;
              }
            } else if (fieldName === "customerLastName") {
              if (customerLastName === fieldValue) {
                rulesCounter++;
              }
            } else if (fieldName === "customerEmail") {
              //No Rule defined
            } else if (fieldName === "customerGender") {
              if (customerGender === fieldValue) {
                rulesCounter++;
              }
            } else if (fieldName === "customerOccupation") {
              if (customerOccupation === fieldValue) {
                rulesCounter++;
              }
            } else if (fieldName === "customerSalary") {
              if (customerSalary === fieldValue) {
                rulesCounter++;
              }
            } else if (fieldName === "customerResidentStatus") {
              if (customerResidentStatus === fieldValue) {
                rulesCounter++;
              }
            } else if (fieldName === "customerAge") {
              if (customerAge === fieldValue) {
                rulesCounter++;
              }
            } else {
              throw new GraphQLError("Incorrect rule field name", {
                extensions: {
                  code: "BAD_USER_INPUT",
                },
              });
            }
          } else if (eachRule.ruleOperator === "greater") {
            //write logic for that check
            if (fieldName === "customerFirstName") {
              //logic
            } else if (fieldName === "customerLastName") {
              //logic
            } else if (fieldName === "customerEmail") {
              //logic
            } else if (fieldName === "customerGender") {
              //logic
            } else if (fieldName === "customerOccupation") {
              //logic
            } else if (fieldName === "customerResidentStatus") {
              //logic
            } else if (fieldName === "customerSalary") {
              if (customerSalary > fieldValue) {
                rulesCounter++;
              }
            } else if (fieldName === "customerAge") {
              if (customerAge > fieldValue) {
                rulesCounter++;
              }
            } else {
              throw new GraphQLError("Incorrect rule field name or operator", {
                extensions: {
                  code: "BAD_USER_INPUT",
                },
              });
            }
          } else if (eachRule.ruleOperator === "less") {
            //write logic for that check
            if (fieldName === "customerFirstName") {
              // logic
            } else if (fieldName === "customerLastName") {
              //logic
            } else if (fieldName === "customerEmail") {
              //logic
            } else if (fieldName === "customerGender") {
              //logic
            } else if (fieldName === "customerOccupation") {
              //logic
            } else if (fieldName === "customerResidentStatus") {
              //logic
            } else if (fieldName === "customerSalary") {
              if (customerSalary < fieldValue) {
                rulesCounter++;
              }
            } else if (fieldName === "customerAge") {
              if (customerAge < fieldValue) {
                rulesCounter++;
              }
            } else {
              throw new GraphQLError("Incorrect rule field name or operator", {
                extensions: {
                  code: "BAD_USER_INPUT",
                },
              });
            }
          }

          if (rulesCounter === rules.length) {
            applicableProducts.push(productList[pindex]);
          }
        }
      }

      console.log("Applicable Products Length : ", applicableProducts.length);

      //based on the rules, products must be added and iscustomereligible

      if (applicableProducts.length !== 0) {
        isCustomerEligible = "true";
        products = [...applicableProducts];
      }

      const customer = await Customer.create({
        ...args,
        isCustomerEligible,
        products: [...products],
        // createdBy: "66a449d6877fc178b39b4d18",
      });

      const newAppUser = await AppUser.create({
        appUserFirstName: customer.customerFirstName,
        appUserLastName: customer.customerLastName,
        appUserEmail: customer.customerEmail,
        appUserRole: "customer",
        appUserPassword: generatedPassword,
      });

      const emailSubject = "Welcome to Our Banking System";
      const emailMessage = `We have offered ${applicableProducts.length} products to you. To view the products offered, kindly login in to the website URL: http://localhost:3000.
        Please use email id as your username and password in the following format (firstnameyearOfbirth)(Eg: john1983)`;

      // sendEmailMessage(customer.customerEmail, emailSubject, emailMessage);

      return customer;
      // }
      // throw new GraphQLError("Could not authenticate user.", {
      //   extensions: {
      //     code: "UNAUTHENTICATED",
      //   },
      // });
    },
    addInterest: async (parent, args, context) => {
      if (context.user) {
        const customerInterestedProducts = await Customer.findById(
          context.user._id
        )
          .select("interestedProducts")
          .select("products");

        // const customerInterestedProducts = await Customer.findById(
        //   "66a39c27d9e8edaed21653df"
        // )
        //   .select("interestedProducts")
        //   .select("products");

        for (let index = 0; index < args.products.length; index++) {
          const argElement = args.products[index];
          const product = await Product.findById(argElement);
          if (!customerInterestedProducts.products.includes(product._id)) {
            throw new GraphQLError("Please select from eligible products", {
              extensions: {
                code: "BAD_INPUT",
              },
            });
          }
        }
        let interestedProducts;
        if (customerInterestedProducts.interestedProducts == null) {
          if (args.products.length !== 0) {
            interestedProducts = await CustomerInterest.create({
              isCustomerInterested: args.isCustomerInterested,
              products: [...args.products],
            });
          } else {
            throw new GraphQLError("Please select atleast 1 product.", {
              extensions: {
                code: "BAD_INPUT",
              },
            });
          }
        } else {
          if (args.products.length === 0) {
            await CustomerInterest.findOneAndDelete({
              _id: customerInterestedProducts.interestedProducts,
            });
            await Customer.findByIdAndUpdate(context.user._id, {
              $set: { interestedProducts: null },
            });
            // await Customer.findByIdAndUpdate("66a39c27d9e8edaed21653df", {
            //   $set: { interestedProducts: null },
            // });
          } else {
            interestedProducts = await CustomerInterest.findOneAndUpdate(
              { _id: customerInterestedProducts.interestedProducts },
              {
                $set: {
                  products: [...args.products],
                },
              },
              { runValidators: true, new: true }
            );
          }
        }

        await Customer.findByIdAndUpdate(context.user._id, {
          $set: { interestedProducts: interestedProducts },
        });

        //  // Added for unittesting
        //   await Customer.findByIdAndUpdate("66a39c27d9e8edaed21653df", {
        //     $set: { interestedProducts: interestedProducts },
        //   });

        return interestedProducts;
      }
      throw new GraphQLError("Could not authenticate user.", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    },
  },
};

module.exports = resolvers;
