const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

let VegetableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      get: (v) => v.toFixed(2),
      set: (v) => v,
    },
    color: { type: String, validate: [isHexColor, "color is not a Hex Color"] },
  },
  {
    toJSON: { getters: true },
  },
  { timestamps: true }
);

function isHexColor(s) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s);
}

VegetableSchema.plugin(mongoosePaginate);
const Vegetables = mongoose.model("Vegetables", VegetableSchema);

module.exports = Vegetables;
