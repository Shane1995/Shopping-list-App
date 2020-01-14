const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const connect = require('mongoose').connect

const rootDir = require('./util/path')

const shoppingListRoutes = require('./routes/shoppingList')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(rootDir, 'public')))
app.use(shoppingListRoutes)

connect(
	'mongodb+srv://shane_01:ShaneLinden1@cluster0-tcqav.mongodb.net/shop?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	}
).then(() => {
	app.listen(3000, () => {
		console.log(`Connected on port ${PORT}`)
	})
})
