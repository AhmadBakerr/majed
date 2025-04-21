const express = require('express');
const router = express.Router();
const Poster = require('../models/Poster');


router.get('/', async (req, res) => {
    try {
        const posters = await Poster.find();
        res.json(posters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    const poster = new Poster({
        imageUrl: req.body.imageUrl,
        section: req.body.section,
        isVisible: req.body.isVisible,
    });
    try {
        const newPoster = await poster.save();
        res.status(201).json(newPoster);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedPoster = await Poster.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPoster);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Poster.findByIdAndDelete(req.params.id);
        res.json({ message: 'Poster deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
