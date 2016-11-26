let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('User',
new Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean,
    email: String,
}));
