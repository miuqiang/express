const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  make: String,
  model: String,
  year: Number,
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
},{versionKey: false});

const Car = mongoose.model('car', carSchema);
module.exports = Car;