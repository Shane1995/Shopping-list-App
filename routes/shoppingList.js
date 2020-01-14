const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
	res.render('shopping-list')
})

module.exports = router
