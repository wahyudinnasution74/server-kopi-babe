const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = require("mongoose").Types.ObjectId;

const Product = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    minimumQuantity: {
      type: Number,
    },
    unit: {
      type: String,
      required: true,
    },
    supplier: {
      type: ObjectId,
      ref: "Supplier",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", Product);
