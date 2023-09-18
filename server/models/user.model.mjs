import { Schema, mongoose } from 'mongoose';

import Contact from './contact.model.mjs';
import Experience from './experience.model.mjs';
import Formation from './formation.model.mjs';
import Hobby from './hobby.model.mjs';
import Language from './language.model.mjs';
import Skill from './skill.model.mjs';

// Define the User schema
const userSchema = new Schema({
    contact: {
        type: Contact.schema,
        required: true
    },
    skills: {
        type: [Skill.schema],
        required: true
    },
    languages: {
        type: [Language.schema],
        required: true
    },
    experiences: {
        type: [Experience.schema],
        required: true
    },
    formations: {
        type: [Formation.schema],
        required: true
    },
    hobbies: {
        type: Hobby.schema
    }
})
// Create the User model from the schema
const User = mongoose.model('User', userSchema);
export default User;