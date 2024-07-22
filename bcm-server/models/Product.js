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
    },
    isCustomerInterested: {
      type: Boolean,
      default: false,
    },
    rules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rule",
        // validate: [rulesLimit, "{PATH} exceeds the limit of 4"],
      },
    ],
  },
  {
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Validations for assignedTo employees' size
productSchema.path("rules").validate(function (value) {
  console.log(value.length);
  if (value.length > 4) {
    throw new Error("Assigned rules can't be greater than 4!");
  }
});

const Product = model("Product", productSchema);

module.exports = Product;
