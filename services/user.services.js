const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

class UserServices {
    static async registerUser(email, password, restaurantDetails) {
        const newUser = new UserModel({ email, password, restaurantDetails });
        return await newUser.save();
    }

    static async checkUser(email) {
        return await UserModel.findOne({ email });
    }

    static async getUserById(userId) {
        return await UserModel.findById(userId);
    }

    static async getAllUsers() {
        return await UserModel.find({});
    }

    static generateAccessToken(tokenData, JWTSecret_Key, JWT_EXPIRE) {
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
}

module.exports = UserServices;
