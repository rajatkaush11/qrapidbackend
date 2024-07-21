const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.model');

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

  static async generateAccessToken(tokenData, JWTSecret_Key, JWT_EXPIRE) {
    return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
  }

  static async registerOrLoginGoogleUser(email) {
    let user = await this.getUserByEmail(email);
    if (!user) {
      user = new UserModel({ email, isGoogleUser: true });
      await user.save();
    }
    const tokenData = { _id: user._id, email: user.email };
    const token = await this.generateAccessToken(tokenData, process.env.JWT_SECRET, '2w');
    user.token = token;
    await user.save();
    return { user, token };
  }
}

module.exports = UserServices;
