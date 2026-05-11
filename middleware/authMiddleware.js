// Check if user has an active session
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Check if logged-in user has admin role
const isAdmin = (req, res, next) => {
    if (req.session && req.session.role === 'admin') {
        next();
    } else {
        res.status(403).render('dashboard', {
            error: 'Access denied. Admins only.',
            user: req.session
        });
    }
};

// Export both middleware functions
module.exports = { isAuthenticated, isAdmin };