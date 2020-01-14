const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const rootDir = require('./util/path')

const shoppingListRoutes = require('./routes/shoppingList')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(rootDir, 'public')))

app.use(shoppingListRoutes)

app.listen(3000)
