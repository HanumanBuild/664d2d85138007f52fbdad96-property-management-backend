const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/ServiceRequest');

router.post('/', async (req, res) => {
  const { name, email, issue } = req.body;
  try {
    const serviceRequest = await ServiceRequest.create({ name, email, issue });
    res.status(201).json(serviceRequest);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create service request' });
  }
});

module.exports = router;
