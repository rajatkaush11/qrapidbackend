const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const { users } = require('@clerk/clerk-sdk-node');

// Google login handler
const UserModel = require('../model/user.model');
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
      if (clerkUsers.length === 0) {
        // Create a new Clerk user if not exists
        const clerkUser = await users.createUser({
          emailAddresses: [email],
        });

        user = new UserModel({
          email,
          clerkId: clerkUser.id,
          isGoogleUser: true,
        });
        await user.save();

        res.status(201).json({ status: true, clerkId: clerkUser.id, message: 'User registered with Google' });
      } else {
        const clerkUser = clerkUsers[0];
        user = new UserModel({
          email,
          clerkId: clerkUser.id,
          isGoogleUser: true,
        });
        await user.save();

        res.status(200).json({ status: true, clerkId: clerkUser.id, message: 'User logged in with Google' });
      }
    } else {
      res.status(200).json({ status: true, clerkId: user.clerkId, message: 'User already exists' });
    }
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
