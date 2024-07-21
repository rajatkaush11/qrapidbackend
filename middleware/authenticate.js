const clerk = require('@clerk/clerk-sdk-node'); // Import Clerk SDK

const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ error: 'Access denied. No token provided.' });

  const token = authHeader.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const verified = await clerk.tokens.verifyToken(token); // Verify token with Clerk
    req.user = { clerkId: verified.sub }; // Extract Clerk ID
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
