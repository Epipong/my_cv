import mongoose from "mongoose";

// Define the Skill schema
const skillSchema = new mongoose.Schema({
    content: {
        type: String
    }
})
// Create the Skill model from the schema
const Skill = mongoose.model('Skill', skillSchema);
export default Skill;