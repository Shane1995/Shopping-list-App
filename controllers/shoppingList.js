const ShoppingList = require('../models/shoppingList')

exports.getShoppingList = (req, res, next) => {
	res.render('shopping-list')
}

exports.postShoppingItem = (req, res, next) => {
	const name = req.body.name
	const quantity = req.body.quantity
	const where = req.body.where

	const item = { name, quantity, where }

	res.redirect('/')
}
