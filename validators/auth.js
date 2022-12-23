const { check } = require('express-validator')
const db = require('../db')
const { compare } = require('bcrypt')

const password = check('password')
    .isLength({ min: 6, max: 15 })
    .withMessage('Password has to be between 6 and 15 characters')

const email = check('email')
    .isEmail()
    .withMessage('Please enter a valid email adress')

const emailExists = check('email').custom(async (value) => {
    const { rows } = await db.query('SELECT * from customers WHERE email = $1', [
        value,
    ])
    if (rows.length) {
        throw new Error('Email already exists')
    }
})

const loginCheck = check('email')
    .custom(async (value, { req }) => {
        const customer = await db.query('SELECT * FROM customers WHERE email = $1', [value])
        if (!customer.rows.length) {
            throw new Error('Email does not exists')
        }

        const validPassword = await compare(req.body.password, customer.rows[0].password)
        if (!validPassword) {
            throw new Error('Wrong password!')
        }
        req.customer = customer.rows[0]
    })

module.exports = {
    registerValidation: [email, password, emailExists],
    loginValidation: [loginCheck]
}