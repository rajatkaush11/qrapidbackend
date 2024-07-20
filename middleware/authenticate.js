const UserModel = require('../model/user.model');

const authenticate = async (req, res, next) => {
  try {
    const clerkId = req.header('Authorization').replace('Bearer ', '');
    const user = await UserModel.findOne({ clerkId });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authenticated' });
  }
};

module.exports = authenticate;
