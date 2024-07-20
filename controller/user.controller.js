const UserServices = require('../services/user.services');
const UserModel = require('../model/user.model'); // Ensure UserModel is imported

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const duplicate = await UserServices.getUserByEmail(email);
    if (duplicate) {
      throw new Error(`User ${email} already registered`);
    }

    const user = await UserServices.registerUser(email, password);
    const tokenData = { _id: user._id, email: user.email };
    const token = await UserServices.generateAccessToken(tokenData, process.env.JWT_SECRET, '2w');

    user.token = token;
    await user.save();

    console.log('User registered:', user); // Log user details
    console.log('Token:', token); // Log token

    res.status(201).json({ status: true, success: 'User registered successfully', token });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Parameters are not correct');
    }

    const user = await UserServices.checkUser(email);
    if (!user) {
      throw new Error('User does not exist');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new Error('Username or Password does not match');
    }

    const tokenData = { _id: user._id, email: user.email };
    const token = await UserServices.generateAccessToken(tokenData, process.env.JWT_SECRET, '2w');

    user.token = token;
    await user.save();

    console.log('User logged in:', user); // Log user details
    console.log('Token:', token); // Log token

    res.status(200).json({ status: true, success: 'Login successful', token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error('Email is required');
    }

    const { user, token } = await UserServices.registerOrLoginGoogleUser(email);

    console.log('User logged in with Google:', user); // Log user details
    console.log('Token:', token); // Log token

    res.status(200).json({ status: true, success: 'Login successful', token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getTokenByUserId = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.userId); // Ensure UserModel is imported and used here
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ token: user.token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({}, '_id email'); // Ensure UserModel is imported and used here
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createOrUpdateUser = async (req, res, next) => {
  try {
    const { email, clerkId } = req.body;

    let user = await UserServices.getUserByEmail(email);
    if (!user) {
      user = new UserModel({ email, clerkId }); // Ensure UserModel is imported and used here
    } else {
      user.clerkId = clerkId;
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
