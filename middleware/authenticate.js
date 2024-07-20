// middleware/authenticate.js
const UserModel = require('../model/user.model');

const authenticate = async (req, res, next) => {
  try {
    const clientId = req.header('Authorization').replace('Bearer ', '');
    console.log('ClientId:', clientId); // Log clientId

    if (!clientId) {
      return res.status(401).send({ error: 'Not authenticated - No ClientId' });
    }

    const user = await UserModel.findOne({ clerkId: clientId });
    console.log('User:', user); // Log user

    if (!user) {
      return res.status(401).send({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error); // Log specific error
    res.status(401).send({ error: 'Not authenticated' });
  }
};

module.exports = authenticate;
