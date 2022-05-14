'use strict'
const dbConfig = require('../db.config');
//Modelos
let User;
function getUsers(req, res, next) {
	initConnectionDB()
	User.find()
		.then(r => {
			res.json({ Users: r })
		})
}

function initConnectionDB() {

	const Model = require('./../models/model');

	let UserSchema = require('./../models/user.model');
	User = new Model('user', {
		schema: UserSchema,
		connection: dbConfig.DB
	});

}

module.exports = {
	getUsers,
}