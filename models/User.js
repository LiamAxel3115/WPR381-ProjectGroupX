// Import mongoose for MongoDB interaction
const mongoose = require('mongoose');

// Define the user schema structure
const userSchema = new mongoose.Schema({

    // Store user's full name
    name: {
        type: String,
        required: true
    },

    // Store unique email address
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Store hashed password
    password: {
        type: String,
        required: true
    },

     // Store user role for access control
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

}, {
    // Automatically add createdAt and updatedAt fields
    timestamps: true
});

// Export the User model
module.exports = mongoose.model('User', userSchema);