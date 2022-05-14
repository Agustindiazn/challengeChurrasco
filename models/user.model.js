'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    password: { type: String, trim: true },
    role: { type: String, trim: true },
    active: { type: Boolean },
    lastLogin: { type: Date },
    firstName: { type: String, trim: true },
    lasName: { type: String, trim: true },
    birthday: { type: Date }
});

module.exports = UserSchema;
