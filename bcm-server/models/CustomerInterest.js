const mongoose = require("mongoose");

const { Schema } = mongoose;

const customerInterestSchema = new Schema(
  {
    isCustomerInterested: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { toJSON: { getters: true, virtuals: true }, id: false, timestamps: true }
);

// Created a virtual property `eligibleProductsCount` that retrieves the length of the eligible products.
customerInterestSchema.virtual("interestedProductsCount").get(function () {
  return this.products.length;
});

const CustomerInterest = mongoose.model(
  "CustomerInterest",
  customerInterestSchema
);

module.exports = CustomerInterest;
