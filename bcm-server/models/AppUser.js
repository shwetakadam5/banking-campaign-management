const { Schema, model } = require("mongoose");

const appUserSchema = new Schema({
  appUserName: {
    type: String,
    required: true,
    trim: true,
  },
});

const AppUser = model("AppUser", appUserSchema);

module.exports = AppUser;
