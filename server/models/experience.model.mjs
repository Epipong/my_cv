import mongoose from "mongoose";

// Define the Experience schema
const experienceSchema = new mongoose.Schema({
	period: {
        type: String,
        required: true
    },
	company: {
        type: String,
        required: true
    },
	mission: {
        type: String
    },
	role: {
        type: String,
        required: true
    },
	content: {
        type: String,
        required: true
    },
	stack: {
        type: String
    }
})
// Create the Experience model from the schema
const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;