const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures email is unique
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the User model
const User = mongoose.model('details', userSchema);

module.exports = User; // Export the User model
