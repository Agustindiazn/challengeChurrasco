'use strict'
const dbConfig = require('../db.config');
//Modelos
let Product
function getProducts(req, res) {
	initConnectionDB()
	const match = req.body.match || {}

	Product.find(match, (error, products) => {
		if (error) {
			return res.status(500).send({ message: error.message, error })
		} if (products.length === 0) {
			return res.status(200).send({ message:'No se encontro el producto' })
		}
		return res.status(200).send(products)
	})

}
function saveProduct(req, res) {
	initConnectionDB();

	const { sku, code, name, description, pictures, price, currency } = req.body

	let product = new Product();
	product.SKU = sku
	product.code = code
	product.name = name
	product.description = description
	product.pictures = pictures
	product.price = price
	product.currency = currency

	product.save((error, productSave) => {
		if (error) {
			return res.status(500).send({ message: error.message, error })
		}
		return res.status(201).send({ message: 'Guardado con exitos', product: productSave })
	})


}
function initConnectionDB() {

	const Model = require('../models/model');

	let ProductSchema = require('../models/product.model');
	Product = new Model('product', {
		schema: ProductSchema,
		connection: dbConfig.DB
	});

}

module.exports = {
	getProducts,
	saveProduct
}