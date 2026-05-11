// Takes the required role as an argument and returns a middleware function
const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (req.session && req.session.role === role) {
      next(); // Role matches, allow through
    } else {
      // Logged in but wrong role
      res.status(403).render('dashboard', {
        error: 'Access denied. Admins only.',
        user: req.session
      });
    }
  };
};

module.exports = roleMiddleware;
