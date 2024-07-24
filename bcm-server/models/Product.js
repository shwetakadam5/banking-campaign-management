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
    isCustomerInterested: {
      type: Boolean,
      default: false,
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

const Product = model("Product", productSchema);

module.exports = Product;
