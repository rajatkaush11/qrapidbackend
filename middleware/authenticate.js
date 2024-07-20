const UserModel = require('../model/user.model');

const authenticate = async (req, res, next) => {
  try {
    const clientId = req.header('Authorization').replace('Bearer ', '');
    console.log('ClientId:', clientId); // Log clientId

    const user = await UserModel.findOne({ clerkId: clientId });
    console.log('User:', user); // Log user

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error); // Log specific error
    res.status(401).send({ error: 'Not authenticated' });
  }
};

module.exports = authenticate;
