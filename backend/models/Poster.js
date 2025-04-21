const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    isVisible: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Poster', posterSchema);
