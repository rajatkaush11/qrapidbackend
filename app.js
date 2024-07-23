const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./routers/user.router');
const categoryRouter = require('./routers/category.router');
const itemRouter = require('./routers/item.router');
require('dotenv').config();

const app = express();
const allowedOrigins = ['https://qrapidwebsite.vercel.app', 'https://digitalmenu-rouge.vercel.app'];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch(err => {
        console.log('MongoDB Connection error', err);
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
app.use(userRouter);
app.use(categoryRouter);
app.use(itemRouter); // Ensure this line is present

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

module.exports = app;
