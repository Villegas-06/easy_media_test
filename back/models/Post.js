const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: String,
    username: String,
    postTitle: String,
    postMessage: String,
    datetime: Date
}, {
    collection: 'posts'
});

module.exports = mongoose.model('Posts', postSchema);