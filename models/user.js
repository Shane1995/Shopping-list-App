const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const ShoppingList = require('./shoppingList')

const constraints = require('../util/constraints')

const userSchema = Schema({
	username: constraints(String, true),
	email: constraints(String, true),
	ShoppingLists: {
		list: [
			{
				ShoppingListId: {
					type: Schema.Types.ObjectId,
					ref: 'ShoppingList'
				},
				items: [],
				created: {
					type: Date
				}
			}
		]
	}
})

userSchema.methods.saveList = function(listId, name) {
	return ShoppingList.findById(listId).then(list => {
		const newList = {
			ShoppingListId: { ...list },
			items: list.items,
			name: name,
			created: new Date().getTime()
		}

		this.ShoppingLists.list.push(newList)
		return this.save()
	})
}

module.exports = mongoose.model('User', userSchema)
