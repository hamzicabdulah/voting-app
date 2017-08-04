const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    userId: String,
    question: String,
    options: Object
});

module.exports = mongoose.model('Poll', pollSchema);
