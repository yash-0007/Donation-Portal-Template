const mongoose = require("mongoose");

const NGOSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  yearOfEst: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const NGO = mongoose.model("NGO", NGOSchema);
module.exports = NGO;
