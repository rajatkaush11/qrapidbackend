const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader); // Log the Authorization header

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '');
  console.log('Extracted Token:', token); // Log the extracted token

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Verified Token Data:', verified); // Log the verified token data
    req.user = verified;
    next();
  } catch (error) {
    console.error('Token verification error:', error); // Log token verification error
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
