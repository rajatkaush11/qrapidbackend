const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Routers
const userRouter = require('./routers/user.router');
const categoryRouter = require('./routers/category.router');
const itemRouter = require('./routers/item.router');
const restaurantRouter = require('./routers/restaurant.router');
const orderRouter = require('./routers/order.router');  // Import order router

const app = express();
const allowedOrigins = ['https://qr-dashboard-1107.web.app', 'https://digitalmenu-rouge.vercel.app'];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch(err => {
        console.error('MongoDB Connection error:', err);
    });

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use Routers
app.use(userRouter);
app.use(categoryRouter);
app.use(itemRouter);
app.use(restaurantRouter);
app.use(orderRouter);  // Add order router

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ error: err.message });
});

module.exports = app;
