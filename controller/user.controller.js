// controller/user.controller.js
const UserServices = require('../services/user.services');
const UserModel = require('../model/user.model');

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
    const token = await UserServices.generateAccessToken(user);

    console.log('User registered:', user); // Log user details

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

    const token = await UserServices.generateAccessToken(user);

    console.log('User logged in:', user); // Log user details

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

    res.status(200).json({ status: true, success: 'Login successful', token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.createOrUpdateUser = async (req, res, next) => {
  try {
    const { email, clerkId, isGoogleUser } = req.body;
    console.log('Received request to create/update user:', req.body); // Log the request body

    let user = await UserServices.getUserByEmail(email);
    if (!user) {
      user = new UserModel({ email, clerkId, isGoogleUser });
      console.log('Creating new user:', user); // Log new user creation
    } else {
      user.clerkId = clerkId;
      console.log('Updating existing user:', user); // Log user update
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error); // Log specific error
    next(error);
  }
};
