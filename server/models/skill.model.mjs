const mongoose = require('mongoose');

// Define the Skill schema
const skillSchema = new mongoose.Schema({
    content: {
        type: String
    },
    level: {
        type: Number
    }
})
// Create the Skill model from the schema
const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;