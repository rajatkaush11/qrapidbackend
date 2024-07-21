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
    let clerkId;

    if (!user) {
      const clerkUsers = await users.getUserList({ emailAddress: email });
      if (clerkUsers.length === 0) {
        // Create a new Clerk user if not exists
        const clerkUser = await users.createUser({
          emailAddresses: [email],
        });

        clerkId = clerkUser.id;
        user = new UserModel({
          email,
          clerkId,
          isGoogleUser: true,
        });
        await user.save();
      } else {
        const clerkUser = clerkUsers[0];
        clerkId = clerkUser.id;
        user = new UserModel({
          email,
          clerkId,
          isGoogleUser: true,
        });
        await user.save();
      }
    } else {
      clerkId = user.clerkId;
    }

    // Generate token
    const tokenData = { _id: user._id, email: user.email, clerkId: user.clerkId };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '2w' });

    user.token = token;
    await user.save();

    res.status(200).json({ status: true, clerkId, token, message: 'User logged in with Google' });
  } catch (error) {
    next(error);
  }
};
