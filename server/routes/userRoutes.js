const express = require('require');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const router = express.Router();

//@route POST / api/users/register
// @desc Register a new user
// @access Public

router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min:6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            //Create new user
            user = new User({
                name,
                email,
                password
            });

            //Hash the password
            const salt = awaitbcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            //generate JWT token
            const payload = {
                user: {
                    id: user.id
                }
            };
            
            jwt.sign(payload, process.env.JWT_SECRET, { expressIn: '1h '}, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);


// @route POST / api/users/login
// @desc Authenticate user and get token
// @access Public

router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            // Generate JWT token
            const payload = {
                user: {
                id: user.id
                }
            };
            
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
            } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
            }
    }
);

module.exports = router;