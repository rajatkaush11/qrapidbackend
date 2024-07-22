const UserServices = require('../services/user.services');

exports.register = async (req, res, next) => {
    try {
        const { email, password, restaurantDetails } = req.body;

        if (!email || !password || !restaurantDetails) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const user = await UserServices.registerUser(email, password, restaurantDetails);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }

        const user = await UserServices.checkUser(email);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const tokenData = { _id: user._id, email: user.email };
        const token = await UserServices.generateAccessToken(tokenData, process.env.JWT_SECRET, "2w");

        user.token = token;
        await user.save();

        res.status(200).json({ message: 'Login successful', token, userId: user._id });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getTokenByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await UserServices.getUserById(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ token: user.token });
    } catch (error) {
        console.error('Error retrieving token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await UserServices.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getRestaurantDetailsByUserId = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const user = await UserServices.getUserById(userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json(user.restaurantDetails);
    } catch (error) {
        console.error('Error retrieving restaurant details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
