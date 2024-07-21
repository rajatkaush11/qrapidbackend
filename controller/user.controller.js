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
