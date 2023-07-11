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

// Home Page
app.get('/', (req, res) => {
    res.render('index');
});

// Register Page
app.get('/register', (req, res) => {
    res.render('register');
});

// Register user
app.post('/register', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    //Check previous user
    if (user) {
        return res.status(400).send('User already exists');
    }
    // Create new user
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
});

// Login Page
app.get('/login', (req, res) => {
    res.render('login');
});

// Login user
app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/register',
    }),
);

app.get('/profile', isAuthenticated, (req, res) => {
    res.send(req.user);
});
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Start server
app.listen(port, () =>
    console.log(`App listening on port http://localhost:${port}`),
);
