const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdSchema = new Schema({
    imageUrl: { type: String, required: true },
    link: { type: String, required: true },
    isVisible: { type: Boolean, default: true },
});

module.exports = mongoose.model('Ad', AdSchema);
