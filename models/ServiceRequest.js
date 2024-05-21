const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  issue: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ServiceRequest = mongoose.model('ServiceRequest', ServiceRequestSchema);
module.exports = ServiceRequest;
