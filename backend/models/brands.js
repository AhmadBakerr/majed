const mongooes = require("mongoose");

const Schema = mongooes.Schema;

const brandSchema = new Schema ({
  name : String,
  photoUrl : String,
  pricePerDay :Number,
  pricePerWeek :Number,
  pricePerMonth:Number,
  category : String,
})

const brand = mongooes.model("Brands", brandSchema);

module.exports = brand