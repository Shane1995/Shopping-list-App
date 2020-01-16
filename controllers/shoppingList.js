/* 
	//todo: Add Item to list 
	todo: Remove Item from list
	todo: Clear Current List 
	todo: Save List 

*/

const ShoppingList = require('../models/shoppingList')

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
			const list = new ShoppingList({
				userId: req.user._id,
				items: item
			})
			return list.save()
		})
		.then(() => {
			res.redirect('/')
		})
		.catch(err => console.log(err))
}

exports.postDeleteItem = (req, res, next) => {
	console.log(req.body.id)
	const id = req.body.id
	ShoppingList.findOne({ userId: req.user._id })
		.then(list => {
			const updatedList = list.items.filter(
				i => i._id.toString() !== id.toString()
			)

			return ShoppingList.updateOne(
				{ userId: req.user._id },
				{ items: updatedList }
			)
		})
		.then(() => {
			console.log('ITEM REMOVED FROM LIST')
			res.redirect('/')
		})
		.catch(err => console.log(err))
}

exports.postSaveList = (req, res, next) => {
	const listId = req.body.listId
	const name = req.body.name
	req.user.saveList(listId, name).then(() => {
		res.redirect('/')
	})
}

exports.getShoppingList = (req, res, next) => {
	ShoppingList.findOne({ userId: req.user._id })
		.then(list => {
			let items = []
			let listId = -1

			if (list) {
				items = list.items.map(item => {
					return item
				})
				listId = list._id
			}

			res.render('shopping-list', { items: items, listId: listId })
		})
		.catch(err => console.log(err))
}

exports.getClearList = (req, res, next) => {
	const listId = req.params.id
	ShoppingList.findByIdAndRemove(listId)
		.exec()
		.then(() => {
			res.redirect('/')
		})
		.catch(err => console.log(err))
}
