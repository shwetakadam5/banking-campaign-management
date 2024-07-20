require("dotenv").config();

const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

module.exports = {
  // Function to generate a token combining the encoded header and payload and signing it with a secret ket.
  signToken: function ({ _id }) {
    const payload = { _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
