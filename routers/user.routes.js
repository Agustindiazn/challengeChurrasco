'use strict'

let express = require('express');
let UserController = require('./../controllers/user.controller');
let AuthController = require('./../controllers/auth.controller');
let jwtValidation = require('./../services/jwt.services');

let api = express.Router();

api.post('/login', AuthController.login);
api.get('/users', [jwtValidation.createToken, jwtValidation.verifyToken], UserController.getUsers);

module.exports = api;