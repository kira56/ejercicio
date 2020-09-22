const mongoose = require('mongoose');
const brcrypt = require('bcrypt');

const salt = 10;

const usuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
