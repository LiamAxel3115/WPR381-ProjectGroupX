const express = require('express');
const router = express.Router();

const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

//change this back later when login works lmao
//router.get('/admin/dashboard', isAuthenticated, isAdmin, adminController.dashboard);
router.get('/dashboard', adminController.dashboard);
module.exports = router;