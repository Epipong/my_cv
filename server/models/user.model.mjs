const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    //
})
// Create the User model from the schema
const User = mongoose.model('User', userSchema);
module.exports = User;