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

// Define the Skill schema
const skillSchema = new Schema({
    content: {
        type: String
    }
})


// Define the Language schema
const languageSchema = new Schema({
    name: {
        type: String
    },
    level: {
        type: String
    }
})

// Define the Experience schema
const experienceSchema = new Schema({
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

// Define the Hobby schema
const hobbySchema = new Schema({
    text: {
        type: String
    }
})

// Define the User schema
const userSchema = new Schema({
    contact: {
        type: contactSchema,
        required: true
    },
    skills: {
        type: [skillSchema],
        required: true
    },
    languages: {
        type: [languageSchema],
        required: true
    },
    experiences: {
        type: [experienceSchema],
        required: true
    },
    formations: {
        type: [formationSchema],
        required: true
    },
    hobbies: {
        type: hobbySchema
    }
})
// Create the User model from the schema
const User = mongoose.model('User', userSchema);

export default User;