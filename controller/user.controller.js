const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const { users } = require('@clerk/clerk-sdk-node');

// Google login handler
exports.googleLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error('Email is required');
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      const clerkUsers = await users.getUserList({ emailAddress: email });
      if (!clerkUsers.length) {
        throw new Error('Clerk user not found');
      }

      const clerkUser = clerkUsers[0];
      user = new UserModel({
        email,
        clerkId: clerkUser.id,
        isGoogleUser: true
      });
      await user.save();
    }

    const tokenData = { _id: user._id, email: user.email, clerkId: user.clerkId };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '2w' });

    user.token = token;
    await user.save();

    res.status(200).json({ status: true, success: 'Login successful', token });
  } catch (error) {
    next(error);
  }
};

// Create or update user with Clerk ID
exports.createOrUpdateUser = async (req, res, next) => {
  try {
    const { email, clerkId, isGoogleUser } = req.body;

    let user = await UserModel.findOne({ email });
    if (!user) {
      user = new UserModel({
        email,
        clerkId,
        isGoogleUser
      });
    } else {
      user.clerkId = clerkId;
      user.isGoogleUser = isGoogleUser;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
