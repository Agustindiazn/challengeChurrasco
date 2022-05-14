const mongoose = require('mongoose');
const config = require('./db.config');
let moment = require('moment');
moment.locale('es');

mongoose.Promise = global.Promise;

let connections = new Array();

function createConnection(name = 'challenge') {

	let uri = `mongodb://${config.USER}:${config.PASSWORD}@${config.MONGO_URL}/${name}?authSource=${config.AUTHSOURCE}`;  // LOCAL

	let conn = getConnection(name)

	if (!conn) {
		console.log(moment().format('YYYY-MM-DDTHH:mm:ssZ') + " Creó conexión con base de datos " + name);
		conn = mongoose.createConnection(uri, {
			useUnifiedTopology: true,
			useNewUrlParser: true
		})
		
		let connection = {
			name: name,
			conn: conn
		}
		connections.push(connection);
	}

	return conn;
}

function getConnection(name = 'challenge') {

	let conn = null;

	if (connections.length > 0) {
		for (let i = 0; i < connections.length; i++) {
			if (connections[i]["name"] === name) {
				conn = connections[i]["conn"];
			}
		}
	}

	return conn;
}

module.exports = createConnection(config.DEFAULT);

module.exports.on = createConnection;