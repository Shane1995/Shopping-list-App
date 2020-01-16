const express = require('express')

const shoppingListController = require('../controllers/shoppingList')

const router = express.Router()

router.post('/delete-item', shoppingListController.postDeleteItem)

router.post('/post-item', shoppingListController.postShoppingItem)

router.post('/save-list', shoppingListController.postSaveList)

router.get('/clear-list/:id', shoppingListController.getClearList)

router.get('/', shoppingListController.getShoppingList)

module.exports = router
