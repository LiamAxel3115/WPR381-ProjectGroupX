const authMiddleware = (req, res, next) => {
  // Check if user has an active session
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/auth/login'); // Not logged in, send to login
  }
};

module.exports = authMiddleware;
