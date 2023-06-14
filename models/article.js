const mongoose = require('mongoose');

const schema = new mongoose.Schema ({
    id_author: { type: mongoose.Schema.Types.ObjectId },
    id_genre: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String }, 
    text: { type: String }
});

const model = mongoose.model('article', schema);
module.exports = model;