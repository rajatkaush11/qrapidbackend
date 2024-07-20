const jwt = require('jsonwebtoken');
const Clerk = require('@clerk/clerk-sdk-node');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('Token missing in request headers');
    return res.status(401).send({ error: 'Token missing' });
  }

  try {
    const decoded = await Clerk.verifyToken(token);
    console.log('Decoded token:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(403).send({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
