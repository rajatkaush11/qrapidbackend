const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader);
  
  if (!authHeader) {
    console.error('No Authorization header provided');
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    console.error('No token found after Bearer');
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified successfully:', verified);
    req.user = verified;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
