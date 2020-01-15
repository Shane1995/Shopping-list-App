const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const connect = require('mongoose').connect

const rootDir = require('./util/path')
const connectionString = require('./util/connectionString')

//Routes
const shoppingListRoutes = require('./routes/shoppingList')

//Models
const User = require('./models/user')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(rootDir, 'public')))

app.use((req, res, next) => {
	User.findById('5e1d8eb9a64b610bac87f167')
		.then(user => {
			req.user = user
			next()
		})
		.catch(err => console.log(err))
})

app.use(shoppingListRoutes)

connect(connectionString(), {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).then(() => {
	User.findOne().then(user => {
		if (!user) {
			const user = new User({
				username: 'Shane Linden',
				email: 'shanelinden1995@gmail.com',
				shoppingLists: {
					shoppingList: []
				}
			})
			user.save()
		}
	})
	app.listen(3000, () => {
		console.log(`Connected on port ${PORT}`)
	})
})
