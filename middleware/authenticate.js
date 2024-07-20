const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ _id: data._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.user.clerkId = user.clerkId; // Include clerkId in the request object
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authenticated' });
  }
};

module.exports = authenticate;
