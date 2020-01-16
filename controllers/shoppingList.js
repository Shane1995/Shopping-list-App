const ShoppingList = require('../models/shoppingList')

exports.getShoppingList = (req, res, next) => {
	ShoppingList.findOne({ userId: req.user._id }).then(list => {
		let items = null

		if (list) {
			items = list.items.map(item => {
				return item
			})
		}
		console.log(items)
		res.render('shopping-list', { items: items })
	})
}

exports.postShoppingItem = (req, res, next) => {
	const name = req.body.name
	const quantity = req.body.quantity
	const where = req.body.where

	const item = { name, quantity, where }

	ShoppingList.exists({ userId: req.user._id })
		.then(result => {
			if (result) {
				return ShoppingList.findOne({ userId: req.user._id }).then(
					list => {
						const updatedList = [...list.items, item]
						return ShoppingList.updateOne(
							{ userId: req.user._id },
							{ items: updatedList }
						)
					}
				)
			}
			const list = new ShoppingList({ userId: req.user._id, items: item })
			return list.save()
		})
		.then(() => {
			res.redirect('/')
		})
}
