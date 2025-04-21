const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    console.log("Received data for registration:", req.body);
    try {
        const { uid, email, displayName } = req.body;
        const newUser = new User({ uid, email, displayName });
        await newUser.save();
        console.log("User saved:", newUser);
        res.status(201).send('User registered successfully in MongoDB');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});



module.exports = router;
