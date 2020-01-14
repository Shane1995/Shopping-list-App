const mongoose = require('mongoose')

const Schema = mongoose.Schema

const constraints = (type, required) => {
	return { type: type, required: required }
}

const itemSchema = new Schema({
	name: constraints(String, true),
	quantity: constraints(Number, true),
	where: constraints(String, false)
})

module.exports = mongoose.model('Item', itemSchema)
