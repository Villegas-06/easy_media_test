const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', userSchema);