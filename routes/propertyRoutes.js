const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id });
    res.json(properties);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch properties' });
  }
});

router.post('/', protect, async (req, res) => {
  const { name, address } = req.body;
  try {
    const property = await Property.create({ name, address, owner: req.user._id });
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create property' });
  }
});

router.put('/:id', protect, async (req, res) => {
  const { name, address } = req.body;
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, { name, address }, { new: true });
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update property' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete property' });
  }
});

module.exports = router;
