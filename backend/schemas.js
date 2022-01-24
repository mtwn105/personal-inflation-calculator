const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Basic Inf Schema
const basicInfo = new Schema({
  cpi: { type: Number },
  lastUpdated: { type: String },
  source: { type: String },
});

const BasicInfo = mongoose.model("BasicInfo", basicInfo, "info");

// Inflation Schema
const inflationSchema = new Schema({
  category: { type: String },
  ruralInflation: { type: Number },
  urbanInflation: { type: Number },
  combinedInflation: { type: Number },
  imageUrl: { type: String },
});

const Inflation = mongoose.model("Inflation", inflationSchema, "inflation");


module.exports = {
  BasicInfo,
  Inflation
};
