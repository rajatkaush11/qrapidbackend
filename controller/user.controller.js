const User = require('../models/user.model');

const createUserOrUpdate = async (req, res) => {
  try {
    const { email, clerkId, isGoogleUser, token } = req.body;
    const user = await User.findOneAndUpdate(
      { clerkId },
      { email, isGoogleUser, token },
      { new: true, upsert: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(400).json({ error: 'Error creating/updating user' });
  }
};

module.exports = createUserOrUpdate;
