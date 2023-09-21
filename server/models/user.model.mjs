import { Schema, mongoose } from 'mongoose';

// Define the User schema
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
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
        required: false
    },
    resume_id: {
        type: Schema.Types.ObjectId,
        ref: 'Resume'
    }
})
// Create the Resume model from the schema
const User = mongoose.model('User', userSchema);

export default User;