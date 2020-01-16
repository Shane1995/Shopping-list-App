const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShoppingListSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	items: [
		{
			name: { type: String, required: true },
			quantity: { type: Number, required: true },
			where: { type: String }
		}
	]
})

module.exports = mongoose.model('ShoppingList', ShoppingListSchema)
