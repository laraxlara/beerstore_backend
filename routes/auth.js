const { Router } = require('express')
const { getCustomers, registerCustomers, loginCustomers, protectedRoute, logoutCustomers } = require('../controllers/auth')
const { registerValidation, loginValidation } = require('../validators/auth')
const { validationMiddleware } = require('../middleware/validationMiddleware')
const { customerAuth } = require('../middleware/authMiddleware')
const {costumerAuth} = require('../middleware/authMiddleware')

const router = Router()

router.get('/get-customers', getCustomers)
router.get('/protected', customerAuth, protectedRoute)
router.post('/register', registerValidation, validationMiddleware, registerCustomers)
router.post('/login', loginValidation, validationMiddleware, loginCustomers)
router.get('/logout', logoutCustomers)

module.exports = router