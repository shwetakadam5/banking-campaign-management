const mongoose = require("mongoose");

const { Schema } = mongoose;

const customerInterestSchema = new Schema({
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
});

const CustomerInterest = mongoose.model(
  "CustomerInterest",
  customerInterestSchema
);

module.exports = CustomerInterest;
