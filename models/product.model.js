'use strict'
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProductSchema = new Schema({
    SKU: { type: String, trim: true, required: true },
    code: { type: Number, trim: true },
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    pictures: { type: Array, required: true },
    price: { type: Number, trim: true, required: true },
    currency: { type: String, trim: true, required: true },

});
module.exports = ProductSchema;
