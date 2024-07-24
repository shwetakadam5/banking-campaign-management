const { Schema, model } = require("mongoose");

let validOperators = {
  values: ["greater", "less", "equals"],
  message: "Please provide valid operator value.",
};
let validFieldValues = {
  values: [
    "customerFirstName",
    "customerLastName",
    "customerEmail",
    "customerGender",
    "customerOccupation",
    "customerSalary",
    "customerResidentStatus",
    "customerDateOfBirth",
    "customerAge",
  ],
  message: "Please provide valid operator value.",
};
const ruleSchema = new Schema(
  {
    ruleName: {
      type: String,
      required: [true, "Rule name is required."],
      trim: true,
      unique: true,
    },
    ruleOperandField: {
      type: String,
      required: [true, "Rule OperandField is mandatory."],
      trim: true,
      enum: validFieldValues,
    },
    ruleOperator: {
      type: String,
      required: [true, "Rule Operator is mandatory."],
      trim: true,
      lowercase: true,
      enum: validOperators,
    },
    ruleValue: {
      type: String,
      match: [/^[a-zA-Z0-9]+$/, "Please provide valid rule value."],
    },
  },
  {
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
    timestamps: true,
  }
);

const Rule = model("Rule", ruleSchema);

module.exports = Rule;
