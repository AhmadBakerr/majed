const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const checkAdmin = require('../Middleware/auth');


router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    console.log('GET /items - successfully');
    res.json(items);
  } catch (err) {
    console.error('GET /items - Error retrieving items:', err.message);
    res.status(500).json({ message: err.message });
  }
});


router.post('/', checkAdmin, async (req, res) => {
  const { name, photoUrl, pricePerDay, pricePerWeek, pricePerMonth, category, isPopular, brand, isVisible } = req.body;
  const item = new Item({ 
    name: name || '', 
    photoUrl: photoUrl || '', 
    pricePerDay: pricePerDay || 0, 
    pricePerWeek: pricePerWeek || 0, 
    pricePerMonth: pricePerMonth || 0, 
    category: category || '', 
    isPopular: isPopular || false, 
    brand: brand || '',
    isVisible: isVisible !== undefined ? isVisible : true 
  });

  try {
    const newItem = await item.save();
    console.log('POST /items - New item added:', newItem);
    res.status(201).json(newItem);
  } catch (err) {
    console.error('POST /items - Error adding new item:', err.message);
    res.status(400).json({ message: err.message });
  }
});


router.patch('/:id', checkAdmin, async (req, res) => {
  try {
    const { name, photoUrl, pricePerDay, pricePerWeek, pricePerMonth, category, isPopular, brand, isVisible } = req.body;
    const updateData = { name, photoUrl, pricePerDay, pricePerWeek, pricePerMonth, category, isPopular, brand, isVisible };

    
    for (let prop in updateData) {
      if (updateData[prop] === undefined) {
        delete updateData[prop];
      }
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updateData, { new: true });
    console.log(`PATCH /items/${req.params.id} - Item updated:`, updatedItem);
    res.json(updatedItem);
  } catch (err) {
    console.error(`PATCH /items/${req.params.id} - Error updating item:`, err.message);
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', checkAdmin, async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      console.log(`DELETE /items/${req.params.id} - Item not found`);
      return res.status(404).json({ message: "Item not found" });
    }
    console.log(`DELETE /items/${req.params.id} - Item deleted`);
    res.json({ message: "Item deleted" });
  } catch (err) {
    console.error(`DELETE /items/${req.params.id} - Error deleting item:`, err.message);
    res.status(500).json({ message: err.message });
  }
});

router.get('/popular', async (req, res) => {
  try {
    const popularItems = await Item.find({ isPopular: true }); 
    console.log('GET /items/popular - successfully ');
    res.json(popularItems);
  } catch (err) {
    console.error('GET /items/popular - Error retrieving popular items:', err.message);
    res.status(500).json({ message: err.message });
  }
});
// counter of items
router.get('/count', async (req, res) => {
  try {
    const itemCount = await Item.countDocuments({});
    console.log('GET /items/count - Number of items fetched successfully');
    res.json({ total: itemCount });
  } catch (err) {
    console.error('GET /items/count - Error counting items:', err.message);
    res.status(500).json({ message: err.message });
  }
});








module.exports = router;
