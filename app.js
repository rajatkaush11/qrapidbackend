const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const userRouter = require('./routers/user.router');
const restaurantRouter = require('./routers/restaurant.router');
const authenticate = require('./middleware/authenticate');

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection error', err);
    process.exit(1); // Exit process with failure
  });

app.use(cors());
app.use(bodyParser.json());

// Public routes
app.use(userRouter);

// Protected routes
app.use('/restaurants', authenticate, restaurantRouter); // Apply authentication middleware here

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

module.exports = app;
