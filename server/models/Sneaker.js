const { Schema, model } = require("mongoose");

const SneakerSchema = new Schema(
  {
    type: {
      type: String,
      default: "sneaker",
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

const Sneaker = model("Sneaker", SneakerSchema);

module.exports = Sneaker;