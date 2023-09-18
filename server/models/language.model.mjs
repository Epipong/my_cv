import { Schema, mongoose } from 'mongoose';

// Define the Language schema
const languageSchema = new Schema({
    name: {
        type: String
    },
    level: {
        type: String
    }
})
// Create the Language model from the schema
const Language = mongoose.model('Language', languageSchema);
export default Language;