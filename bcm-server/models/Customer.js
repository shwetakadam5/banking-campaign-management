const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");

let validGenders = {
  values: ["male", "female", "others"],
  message: "Please provide valid gender.",
};

let validResidentStatus = {
  values: ["PR", "CITIZEN", "WORKVISA", "STUDENTVISA", "VISITORVISA"],
  message: "Please provide valid resident status.",
};

const customerSchema = new Schema(
  {
    customerFirstName: {
      type: String,
      required: [true, "Customer first name is required."],
      trim: true,
    },
    customerLastName: {
      type: String,
      required: [true, "Customer last name is required."],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email id is required."],
      unique: true,
      lowercase: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Please provide valid email id.",
      ],
    },
    customerGender: {
      type: String,
      required: [true, "Customer gender is required."],
      lowercase: true,
      trim: true,
      enum: validGenders,
    },

    customerOccupation: {
      type: String,
      trim: true,
    },
    customerSalary: {
      type: Number,
      required: [true, "Customer salary is required."],
      // min: 1,
      // max: 100,
    },
    customerResidentStatus: {
      type: String,
      required: [true, "Customer resident status is required."],
      uppercase: true,
      trim: true,
      enum: validResidentStatus,
    },
    customerDateOfBirth: {
      type: Date,
      required: [true, "Customer date of birth is required."],
      get: (date) => {
        if (date != null) {
          const originalDate = dayjs(date);
          const newDate = originalDate.format("M/D/YYYY");
          return newDate;
        }
        return;
      },
    },
    isCustomerEligible: {
      type: Boolean,
      default: false,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    interestedProducts: {
      type: Schema.Types.ObjectId,
      ref: "CustomerInterest",
      default: null,
    },
  },
  { toJSON: { getters: true, virtuals: true }, id: false, timestamps: true }
);

// Created a virtual property `customerAge` that retrieves age of the customer based on the date of birth
customerSchema.virtual("customerAge").get(function () {
  let birthDate = new Date(this.customerDateOfBirth);
  let todayDate = new Date();
  let customerAge = todayDate.getFullYear() - birthDate.getFullYear();
  let monthDiff = todayDate.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && todayDate.getDate() < birthDate.getDate())
  ) {
    customerAge--; // Adjust age if birthdate hasn't occurred this year yet
  }
  return customerAge;
});

//create a virtual to generate default password

const Customer = model("Customer", customerSchema);

module.exports = Customer;
