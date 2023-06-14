const mongoose = require('mongoose');

const schema = new mongoose.Schema ({
    author: { type: String }   
});

const model = mongoose.model('author', schema);
module.exports = model;