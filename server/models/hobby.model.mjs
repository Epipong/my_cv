import mongoose from "mongoose";

// Define the Hobby schema
const hobbySchema = new mongoose.Schema({
    text: {
        type: String
    }
})
// Create the Hobby model from the schema
const Hobby = mongoose.model('Hobby', hobbySchema);
export default Hobby;