const jwt = require('jsonwebtoken');
const { Clerk } = require("@clerk/clerk-sdk-node");

const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

const authenticate = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        console.error('No Authorization header found');
        return res.status(401).send({ error: 'Please authenticate.' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const session = await clerk.sessions.getSession(decoded.sessionId);
        if (!session) {
            throw new Error('Invalid Clerk session');
        }

        req.user = { _id: decoded._id, email: decoded.email };
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = authenticate;
