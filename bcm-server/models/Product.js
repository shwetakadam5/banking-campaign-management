const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
    },
    productType: {
      type: String,
    },
    productDescription: {
      type: String,
      required: [true, "Product description is required."],
      trim: true,
    },
    rules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rule",
      },
    ],
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

// Validations on the number of rules that are applicable per product.
productSchema.path("rules").validate(function (value) {
  if (value.length > 4) {
    throw new Error("Assigned rules can't be greater than 4!");
  }
});

// Created a virtual property `applicableRulesCount` that retrieves the length of the applicable rules.
productSchema.virtual("applicableRulesCount").get(function () {
  return this.rules.length;
});

productSchema
  .virtual("allRuleNames")
  // Getter
  .get(function () {
    let allRuleNames = [];
    for (let index = 0; index < this.rules.length; index++) {
      const element = this.rules[index];
      allRuleNames.push(element.ruleName);
    }

    return `${allRuleNames.toString()}`;
  });

const Product = model("Product", productSchema);

module.exports = Product;
