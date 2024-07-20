// middleware/authenticate.js
const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('Token:', token); // Log token

    if (!token) {
      return res.status(401).send({ error: 'Not authenticated - No token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded:', decoded); // Log decoded token

    const user = await UserModel.findOne({ _id: decoded._id, 'tokens.token': token });
    console.log('User:', user); // Log user

    if (!user) {
      return res.status(401).send({ error: 'User not found' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error); // Log specific error
    res.status(401).send({ error: 'Not authenticated' });
  }
};

module.exports = authenticate;
