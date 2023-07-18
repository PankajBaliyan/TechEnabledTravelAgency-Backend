// index.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');

// Routes Import
const authRoutes = require('./routes/authRoutes');
const packagesRotes = require('./routes/package.js')

// env setup
require('dotenv').config();

// eslint-disable-next-line no-unused-vars
const passportConfig = require('./passportConfig');
const { connectMongoose } = require('./database');

const app = express();
const port = process.env.PORT;
const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY;

// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: SESSION_SECRET_KEY,
        resave: true,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            // secure: true //for https not for localhost
            // 1000 milliseconds
            expires: Date.now * 1000 * 60 * 60 * 24,
            maxAge: 1000 * 60 * 60 * 24,
        },
    }),
);
// Initialize Passport configuration
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

// Connect to MongoDB
connectMongoose();

// Routes
app.use('/auth', authRoutes);
app.use('/auth', packagesRotes);

// Start server
app.listen(port, () =>
    console.log(`Server listening on port http://localhost:${port}`),
);
