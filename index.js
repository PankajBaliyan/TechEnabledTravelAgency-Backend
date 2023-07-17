const express = require('express');
const app = express();
// env setup
require('dotenv').config();
const passport = require('passport');
const { initializingPassport, isAuthenticated } = require('./passportConfig');
const expressSession = require('express-session');

const { connectMongoose, User } = require('./database');
const port = process.env.PORT;
const ejs = require('ejs');

// connect mongoose
connectMongoose();
initializingPassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 1st step
app.use(
    expressSession({
        secret: 'mySecret',
        resave: false,
        saveUninitialized: false,
    }),
);
// 2nd step
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');


// Routes
const packagesRotes = require('./routes/package.js')
app.use(packagesRotes);

// Start server
app.listen(port, () =>
    console.log(`App listening on port http://localhost:${port}`),
);
