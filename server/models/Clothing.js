const { Schema, model } = require("mongoose");

const ClothingSchema = new Schema(
  {
    type: {
      type: String,
      default: "clothing",
      required: true
    },
    name: {
      type: String,
      required: true,
      maxlength: 30
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }
);

const Clothing = model("Clothing", ClothingSchema);

module.exports = Clothing;