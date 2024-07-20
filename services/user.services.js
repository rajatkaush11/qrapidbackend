const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');

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
}

module.exports = UserServices;
