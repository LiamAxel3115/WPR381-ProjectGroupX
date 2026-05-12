//Import required packages
const User = require('../models/User');
const bcrypt = require('bcrypt');


// REGISTER USER
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send("User already exists");
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "user" // default role
        });

        await newUser.save();

        // Redirect to login after registration
        res.redirect('/login');

    } catch (error) {
        console.log(error);
        res.status(500).send("Error registering user");
    }
};



// LOGIN USER
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.send("User not found");
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send("Invalid credentials");
        }

        // Store user details in session
        req.session.userId = user._id;
        req.session.role = user.role;
        req.session.name = user.name;

        if(user.role == 'admin'){
            return res.redirect('/admin/dashboard');
        }
        else{
            return res.redirect('/bookings/dashboard');
         }
        

    } catch (error) {
        console.log(error);
        res.status(500).send("Login error");
    }
};



// LOGOUT USER
exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        return res.redirect('/index');
    });
};