const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({
    name: String,
    voters: Array
});

const pollSchema = mongoose.Schema({
    username: String,
    question: String,
    voters: Array,
    options: [optionSchema]
});

module.exports = mongoose.model('Poll', pollSchema);
