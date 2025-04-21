const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');

router.get('/', async (req, res) => {
    try {
        const ads = await Ad.find();
        res.json(ads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/', async (req, res) => {
    const ad = new Ad({
        imageUrl: req.body.imageUrl,
        link: req.body.link,
        isVisible: req.body.isVisible,
    });
    try {
        const newAd = await ad.save();
        res.status(201).json(newAd);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const updatedAd = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAd);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await Ad.findByIdAndDelete(req.params.id);
        res.json({ message: 'Ad deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
