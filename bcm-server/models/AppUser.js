const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

let validUserRoles = {
  values: ["agent", "admin", "customer"],
  message: "Please provide valid user role.",
};
const appUserSchema = new Schema(
  {
    appUserFirstName: {
      type: String,
      required: [true, "User first name is required."],
      trim: true,
    },
    appUserLastName: {
      type: String,
      required: [true, "User last name is required."],
      trim: true,
    },
    appUserEmail: {
      type: String,
      required: [true, "User email id is required."],
      unique: true,
      lowercase: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Please provide valid email id.",
      ],
    },
    appUserPassword: {
      type: String,
      required: [true, "User Password is required."],
      minlength: [5, "User Password must be atleast 5 characters"],
    },
    appUserRole: {
      type: String,
      required: [true, "User Role is required."],
      lowercase: true,
      trim: true,
      enum: validUserRoles,
    },
  },
  {
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// set up pre-save middleware to create password
appUserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("appUserPassword")) {
    const saltRounds = 10;
    this.appUserPassword = await bcrypt.hash(this.appUserPassword, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
appUserSchema.methods.isCorrectPassword = async function (appUserPassword) {
  return await bcrypt.compare(appUserPassword, this.appUserPassword);
};

// Create a virtual property `fullName` that gets and sets the user's full name
appUserSchema
  .virtual("appUserFullName")
  // Getter
  .get(function () {
    return `${this.appUserFirstName} ${this.appUserLastName}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const appUserFirstName = v.split(" ")[0];
    const appUserLastName = v.split(" ")[1];
    this.set({ appUserFirstName, appUserLastName });
  });

const AppUser = model("AppUser", appUserSchema);

module.exports = AppUser;
