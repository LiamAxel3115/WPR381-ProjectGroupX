//Import required packages
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');



// SHOW REGISTER PAGE
router.get('/register', (req, res) => {
    res.render('register'); // views/register.ejs
});



// REGISTER USER (POST)
router.post('/register', authController.registerUser);



// SHOW LOGIN PAGE
router.get('/login', (req, res) => {
    res.render('login'); // views/login.ejs
});



// LOGIN USER (POST)
router.post('/login', authController.loginUser);



// LOGOUT USER
router.get('/logout', authController.logoutUser);


module.exports = router;