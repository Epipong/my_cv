import { Schema, mongoose } from 'mongoose';

// Define the Hobby schema
const hobbySchema = new Schema({
    text: {
        type: String
    }
})
// Create the Hobby model from the schema
const Hobby = mongoose.model('Hobby', hobbySchema);
export default Hobby;