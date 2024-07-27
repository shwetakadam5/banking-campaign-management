require("dotenv").config();

const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

module.exports = {
  // Function to generate a token combining the encoded header and payload and signing it with a secret key.

  signToken: function ({ _id, appUserEmail, appUserRole, appUserFullName }) {
    const payload = {
      _id,
      appUserEmail,
      appUserRole,
      appUserFullName,
    };
    return jwt.sign({ authenticatedUser: payload }, secret, {
      expiresIn: expiration,
    });
  },
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    console.log(token);

    // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }
    console.log(token);
    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { authenticatedUser } = jwt.verify(token, secret, {
        maxAge: expiration,
      });

      req.user = authenticatedUser;
    } catch {
      console.log("Invalid token");
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
  },
};
