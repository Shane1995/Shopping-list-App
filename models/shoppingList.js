const mongoose = require('mongoose')

const Schema = mongoose.Schema

const constraints = require('../util/constraints')

/* 
	//todo: Add user Id to the schema	
	shoppingList: {
		userId: 
		items: [
			{
				name: String, 
				quantity: Number, 
				where: String, 
				
			}
		], 
		numberOfItems: 
	}

*/

const shoppingListSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	items: [
		{
			name: constraints(String, true),
			quantity: constraints(Number, true),
			where: constraints(String, false)
		}
	]
})

module.exports = mongoose.model('ShoppingList', shoppingListSchema)
