exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log('Login Data:', { email, password });

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

        console.log('Generated Token:', token);

        user.token = token;
        await user.save();

        res.status(200).json({ status: true, success: "Login successful", token: token, userId: user._id });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
