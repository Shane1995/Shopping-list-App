const express = require('express')

const shoppingListController = require('../controllers/shoppingList')

const router = express.Router()

router.get('/', shoppingListController.getShoppingList)

module.exports = router
