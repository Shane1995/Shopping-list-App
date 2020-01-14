const express = require('express')

const shoppingListController = require('../controllers/shoppingList')

const router = express.Router()

router.get('/', shoppingListController.getShoppingList)

router.post('/post-item', shoppingListController.postShoppingItem)

module.exports = router
