const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.model');

const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.error('No Authorization header found');
    return res.status(401).send({ error: 'Please authenticate.' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  console.log('Token:', token); // Log the token to see what is being sent

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded:', decoded);
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      console.error('User not found');
      throw new Error('User not found');
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authenticate;
