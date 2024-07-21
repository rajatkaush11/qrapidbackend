const jwt = require('jsonwebtoken');
const { users } = require('@clerk/clerk-sdk-node');

const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ error: 'Access denied. No token provided.' });

  const token = authHeader.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { clerkId: verified.clerkId, email: verified.email }; // No need to fetch from Clerk here
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
