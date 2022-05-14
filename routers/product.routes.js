'use strict'
let express = require('express');
let ProductController = require('../controllers/product.controller');
let jwtValidation = require('../services/jwt.services');


let api = express.Router();

api.get('/products', [jwtValidation.createToken, jwtValidation.verifyToken], ProductController.getProducts);
api.post('/save/product', [jwtValidation.createToken, jwtValidation.verifyToken], ProductController.saveProduct)

module.exports = api;