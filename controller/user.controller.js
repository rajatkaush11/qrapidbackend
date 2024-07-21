const UserServices = require('../services/user.services');
const UserModel = require('../model/user.model');
const RestaurantModel = require('../model/restaurant.model');

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            throw new Error(`UserName ${email}, Already Registered`);
        }
        await UserServices.registerUser(email, password);
        res.json({ status: true, success: 'User registered successfully' });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameters are not correct');
        }

        let user = await UserServices.checkUser(email);
        if (!user) {
            throw new Error('User does not exist. Please register your restaurant first.');
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new Error('Username or Password does not match');
        }

        const restaurant = await RestaurantModel.findOne({ owner: user._id });
        if (!restaurant) {
            throw new Error('Restaurant registration is incomplete. Please register your restaurant.');
        }

        let tokenData = { _id: user._id, email: user.email };
        const token = await UserServices.generateAccessToken(tokenData, process.env.JWT_SECRET, "2w");

        console.log('Generated Token:', token);

        user.token = token;
        await user.save();

        res.status(200).json({ status: true, success: "Login successful", token: token });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
