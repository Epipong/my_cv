const mongoose = require('mongoose');

// Define the Language schema
const languageSchema = new mongoose.Schema({
    name: {
        type: String
    },
    level: {
        type: Number
    }
})
// Create the Language model from the schema
const Language = mongoose.model('Language', languageSchema);
module.exports = Language;