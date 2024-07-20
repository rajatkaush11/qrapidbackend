// services/user.services.js
const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
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

  static async generateAccessToken(user) {
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '2w' });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  }

  static async registerOrLoginGoogleUser(email) {
    let user = await this.getUserByEmail(email);
    if (!user) {
      user = new UserModel({ email, isGoogleUser: true }); // Indicate Google user
      await user.save();
    }
    const token = await this.generateAccessToken(user);
    return { user, token };
  }
}

module.exports = UserServices;
