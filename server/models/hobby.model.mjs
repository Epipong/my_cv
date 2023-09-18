const mongoose = require('mongoose');

// Define the Hobby schema
const hobbySchema = new mongoose.Schema({
    text: {
        type: String
    }
})
// Create the Hobby model from the schema
const Hobby = mongoose.model('Hobby', hobbySchema);
module.exports = Hobby;