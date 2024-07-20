class UserServices {
  static async registerUser(email, password) {
    const createUser = new UserModel({ email, password });
    return createUser.save();
  }

  static async registerOrLoginGoogleUser(email) {
    let user = await this.getUserByEmail(email);
    if (!user) {
      user = new UserModel({ email }); // No password field
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
