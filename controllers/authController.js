// controllers/authController.js

const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

//Register
// curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass"}' http://localhost:3000/auth/register
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User Already Exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        // Respond with the created user object
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//Login
//curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass"}' http://localhost:3000/auth/login
exports.login = (req, res, next) => {
    // eslint-disable-next-line no-unused-vars
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.status(200).json(user);
        });
    })(req, res, next);
};

// Logout
// curl http://localhost:3000/auth/logout
exports.logout = (req, res) => {
    const loggedOutUser = req.user; // Retrieve the currently logged-in user

    req.logout(function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }

        // Include the logged-out user information in the response if available
        if (loggedOutUser) {
            res.status(200).json({
                message: 'Logged out successfully',
                user: loggedOutUser,
            });
        } else {
            res.status(200).json({ message: 'Logged out successfully' });
        }
    });
};

//Get User Details
exports.getUserDetails = (req, res) => {
    const userId = req.params.id;

    User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        })
        .catch((error) => {
            console.error('Failed to get user details', error);
            res.status(500).json({ message: 'Failed to get user details' });
        });
};

//Update Password
exports.updatePassword = async (req, res) => {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ message: 'Incorrect current password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Failed to update password', error);
        res.status(500).json({ message: 'Failed to update password' });
    }
};
