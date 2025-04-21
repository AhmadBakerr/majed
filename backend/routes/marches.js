const express = require('express');
const router = express.Router();
const March = require('../models/March');

router.post('/marches', async (req, res) => {
    try {
        const newMarch = new March({
            name: req.body.name,
            photoUrl: req.body.photoUrl
        });
        await newMarch.save();
        res.status(201).json(newMarch); 
    } catch (error) {
        res.status(400).json({ message: "Error creating march", error: error.message });
    }
});

router.get('/marches', async (req, res) => {
    try {
        const marches = await March.find(); 
        res.json(marches);
    } catch (error) {
        res.status(500).json({ message: "Error fetching marches", error: error.message });
    }
});

module.exports = router;
