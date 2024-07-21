const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { users } = require('@clerk/clerk-sdk-node');

dotenv.config();

const userRouter = require('./routers/user.router');
const restaurantRouter = require('./routers/restaurant.router');
const authenticate = require('./middleware/authenticate');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection error', err);
    process.exit(1); // Exit process with failure
  });

// Middleware
app.use(cors({
  origin: 'https://qrapidwebsite.vercel.app', // Directly use the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(bodyParser.json());

// Public routes
app.use(userRouter);

// Protected routes
app.use('/restaurants', authenticate, restaurantRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

module.exports = app;
