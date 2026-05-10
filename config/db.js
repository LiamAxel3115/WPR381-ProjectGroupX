// Import mongoose for MongoDB connection
const mongoose = require('mongoose');

// Function to connect application to MongoDB
const connectDB = async () => {

    try {

        // Connect to MongoDB using environment variable
        await mongoose.connect(process.env.MONGO_URI);

        // Display success message in terminal
        console.log('MongoDB Connected');

    } catch (error) {

        // Display connection errors
        console.error(error);

        // Stop application if database connection fails
        process.exit(1);
    }
};

// Export database connection function
module.exports = connectDB;