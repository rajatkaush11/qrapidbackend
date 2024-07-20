const UserServices = require('../services/user.services');
const UserModel = require('../model/user.model');
const { Clerk } = require("@clerk/clerk-sdk-node");

const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameters are not correct');
        }

        let user = await UserServices.checkUser(email);
        if (!user) {
            throw new Error('User does not exist');
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new Error('Username or Password does not match');
        }

        const session = await clerk.sessions.createSession({
            emailAddress: email,
            password: password,
        });

        let tokenData = { _id: user._id, email: user.email, sessionId: session.id };
        const token = await UserServices.generateAccessToken(tokenData, process.env.JWT_SECRET, "2w");

        user.token = token;
        await user.save();

        res.status(200).json({ status: true, success: "Login successful", token: token, clerkSession: session });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
