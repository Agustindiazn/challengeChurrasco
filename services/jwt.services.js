// 'use strict'

let jwt = require('jsonwebtoken');
let moment = require('moment');
const dbConfig = require('../db.config');
moment.locale('es');

function createToken(req, res, next) {

    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader === 'undefined') {
        return res.status(403).send({ message: 'Debe iniciar sesion' })
    }
    if (!(bearerHeader.toLowerCase().startsWith('bearer'))) {
        return res.status(403).send({ message: 'Error token authorization' })
    }
    const bearerToken = bearerHeader.split(" ")[1];

    req.token = bearerToken
    next()
}

function verifyToken(req, res, next) {
    if (!req.token) {
        return res.status(403).send({ message: 'Debe iniciar sesion' })
    }
    jwt.verify(req.token, dbConfig.TOKEN_SECRET, (err, authData) => {
        if (err) {
            return res.status(403).send({ message: 'Debe iniciar sesion' })
        }
        const { _id, role, active } = authData.user
        if (!_id || role !== 'admin' || !active) {
            return res.status(403).send({ message: 'Debe iniciar sesion' })
        }
        req.authData = authData
    })
    next()
}

module.exports = {
    createToken,
    verifyToken,
}