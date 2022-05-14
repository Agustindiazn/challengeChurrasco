'use strict'
let jwt = require('jsonwebtoken');

let crypto = require('crypto')
let moment = require('moment');
const dbConfig = require('../db.config');
moment.locale('es');

let User;

function login(req, res) {
    initConnectionDB();
    console.log('req.body', req.body)
    const { userName, password } = req.body;
    if (!(userName && password)) {
        return res.status(500).send({ message: 'Ingresar user/password'})

    }
    const where = `{ "$or": [{"email": "${userName.trim()}"}, {"username":"${userName.trim()}"}]}`;
    User.findOne(JSON.parse(where), (err, user) => {
        if (err) {
            return res.status(500).send('Error al comprobar el usuario');
        }
        if (!user) {
            return res.status(500).send({ message: 'El usuario y/o contraseña son incorrectos' });
        }
        if (user.role !== "admin") {
            return res.status(500).send({ message: 'El usuario no es admin' });
        }
        if (!user.active) {
            return res.status(500).send({ message: 'No tiene permisos' });
        }
        //Comparar contraseñas
        if (!comparePasswords(password, user)) {
            return res.status(500).send({ message: 'contraseña incorrecta' })
        }
        // Mandar auth
        jwt.sign({ user }, dbConfig.TOKEN_SECRET, (err, token) => {
            if (err) {
                return res.status(500).send({ message: 'Error al generar token jwt', error: err })
            }
            return res.status(200).send({ message: 'Login', authentication: 'Bearer '+token })
        })
    })
}
function comparePasswords(password, user) {
    return crypto.createHash('sha256').update(password).digest('hex').includes(user.password);
}

function initConnectionDB(database) {
    const Model = require('./../models/model');
    let UserSchema = require('./../models/user.model');
    User = new Model('user', {
        schema: UserSchema,
        connection: database
    });
}

module.exports = {
    login
}