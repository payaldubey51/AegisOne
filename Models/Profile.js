const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: String,
  phone: String,
 bloodGroup: String,
  emergencyName: String,
  emergencyPhone: String,
});

module.exports = mongoose.model("Profile", profileSchema);