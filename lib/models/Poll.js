const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    userId: String,
    question: String,
    options: Array,
    votes: Array
});

module.exports = mongoose.model('Poll', pollSchema);
