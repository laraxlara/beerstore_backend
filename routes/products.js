const { Router } = require('express')
const { getProducts, getProduct, getTypeProducts } = require('../controllers/products')
const router = require('./auth')

router.get('/products', getProducts)
router.get('/products/:id', getProduct)

module.exports = router