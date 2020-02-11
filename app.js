const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const connect = require('mongoose').connect
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
require('dotenv').config()

const rootDir = require('./util/path')

//Routes
const shoppingListRoutes = require('./routes/shoppingList')

//Models
const User = require('./models/user')

const app = express()
const PORT = 3000 || process.env.PORT

const connectionString = process.env.DB_CONNECTION

const store = new MongoDBStore({
	uri: connectionString,
	collection: 'sessions'
})

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(rootDir, 'public')))
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: store
	})
)

app.use((req, res, next) => {
	User.findById('5e202bf68e469946e0d5df8f')
		.then(user => {
			req.user = user
			next()
		})
		.catch(err => console.log(err))
})

app.use(shoppingListRoutes)

connect(connectionString, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).then(() => {
	User.find().then(user => {
		if (!user) {
			const user = new User({
				username: 'Shane Linden',
				email: 'shanelinden1@gmail.com',
				shoppingLists: {
					list: []
				}
			})
			user.save()
		}
	})
	app.listen(3000, () => {
		console.log(`Connected on port ${PORT}`)
	})
})
