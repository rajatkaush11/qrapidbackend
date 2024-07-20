// services/user.services.js
const UserModel = require('../model/user.model');
const bcryptjs = require('bcryptjs');

class UserServices {
  static async registerUser(email, password) {
    const createUser = new UserModel({ email, password });
    return createUser.save();
  }

  static async getUserByEmail(email) {
    return UserModel.findOne({ email });
  }

  static async checkUser(email) {
    return UserModel.findOne({ email });
  }

  static async getUserByClientId(clientId) {
    return UserModel.findOne({ clerkId: clientId });
  }

  static async registerOrLoginGoogleUser(email) {
    let user = await this.getUserByEmail(email);
    if (!user) {
      user = new UserModel({ email, isGoogleUser: true }); // Indicate Google user
      await user.save();
    }
    user.clerkId = user._id; // Assuming clerkId is same as user._id
    await user.save();
    return user;
  }
}

module.exports = UserServices;
