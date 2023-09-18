import { Schema, mongoose } from 'mongoose';

// Define the Contact schema
const contactSchema = new Schema({
    phone: {
        type: String,
        required: true,
        unique: false
    },
	email: {
        type: String,
        required: true,
        unique: true
    },
	address: {
        type: String,
        required: true
    }
})
// Create the Contact model from the schema
const Contact = mongoose.model('Contact', contactSchema);
export default Contact;