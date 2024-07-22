const { Schema, model } = require("mongoose");

const ruleSchema = new Schema(
  {
    ruleName: {
      type: String,
      required: [true, "Rule name is required."],
      trim: true,
    },
    ruleOperandField: {
      type: String,
    },
    ruleOperator: {
      type: String,
    },
    ruleValue: {
      type: String,
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

const Rule = model("Rule", ruleSchema);

module.exports = Rule;
