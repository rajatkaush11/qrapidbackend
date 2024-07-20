const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.model');

const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log('Authorization Header:', authHeader); // Log the Authorization header
  if (!authHeader) return res.status(401).json({ error: 'Access denied. No token provided.' });

  const token = authHeader.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    // Fetch the user from the database using the user ID in the token
    const user = await UserModel.findById(verified._id);
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user.clientId = user.clerkId; // Add clientId to req.user
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
