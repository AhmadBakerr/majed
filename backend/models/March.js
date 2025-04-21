const mongoose = require('mongoose');

const marchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    photoUrl: {
        type: String,
        required: true,
        trim: true
    }
});

const March = mongoose.model('March', marchSchema);

module.exports = March;
