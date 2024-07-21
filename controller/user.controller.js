const UserServices = require('../services/user.services');
const UserModel = require('../model/user.model');

exports.register = async (req, res, next) => {
    try {
        const { email, password, restaurantName, address, description, timing } = req.body;
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            res.status(400).json({ message: `User ${email} already registered` });
            return;
        }
        const user = await UserServices.registerUser(email, password, { restaurantName, address, description, timing });
        res.json({ status: true, success: 'User and Restaurant registered successfully' });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Parameters are not correct' });
            return;
        }

        let user = await UserServices.checkUser(email);
        if (!user) {
            res.status(400).json({ message: 'User does not exist' });
            return;
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: 'Username or Password does not match' });
            return;
        }

        let tokenData = { _id: user._id, email: user.email };
        const token = await UserServices.generateAccessToken(tokenData, process.env.JWT_SECRET, "2w");

        console.log('Generated Token:', token); // Log the token to the console

        // Save the token in the user's record
        user.token = token;
        await user.save();

        res.status(200).json({ status: true, success: "Login successful", token: token });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getTokenByUserId = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ token: user.token });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find({}, '_id email');
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getRestaurantDetailsByUserId = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user._id, 'restaurantDetails');
        if (!user || !user.restaurantDetails) {
            return res.status(404).send({ error: 'Restaurant not found' });
        }
        res.status(200).send(user.restaurantDetails);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
