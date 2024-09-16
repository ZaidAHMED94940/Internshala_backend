const mongoose = require('mongoose');

const educationProfileSchema = new mongoose.Schema({
  college: String,
  degree: String,
  stream: String,
  percentage: String,
  training: String,
  organization: String,
  description: String,
  link: String,
  hiringReason: String,
  availability: String,
  rating: Number,
  email: {
    type: String,  // Define email as a String
    required: true // You can add validation if needed, such as making it required
  }
});

module.exports = mongoose.model('EducationProfile', educationProfileSchema);
