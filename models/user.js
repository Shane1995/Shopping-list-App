const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

const constraints = require('../util/constraints')

const userSchema = Schema({
	username: constraints(String, true),
	email: constraints(String, true),
	shoppingLists: []
})

module.exports = mongoose.model('User', userSchema)
