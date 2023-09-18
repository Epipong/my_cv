import { Schema, mongoose } from 'mongoose';

// Define the Formation schema
const formationSchema = new Schema({
	period: {
        type: String,
        required: true
    },
	title: {
        type: String,
        required: true
    },
	school: {
        type: String,
        required: true
    }
})
// Create the Formation model from the schema
const Formation = mongoose.model('Formation', formationSchema);
export default Formation;