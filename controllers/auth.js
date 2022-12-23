const db = require('../db')
const {hash} = require('bcrypt')
const {sign} = require('jsonwebtoken')

exports.getCustomers = async (req, res) => {
    try {
        const response = await db.query('SELECT customer_id , email FROM customers')
        
        return res.status(200).json({
            success: true,
            customers: response,
        })
    } catch (error) {
        console.log(error.message)
    }
} 

exports.registerCustomers = async (req, res) => {
    const { email, password } = req.body
    try {
        console.log('Reg success')
        const hashedPassword = await hash(password, 10)

        await db.query('INSERT INTO customers (email, password) values ($1, $2)', [email, hashedPassword])

        return res.status(201).json({
            success: true,
            message: 'Registration was successful'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message,
        })
    }
}

exports.loginCustomers = async (req, res) => {
    let customer = req.customer
    payload = {
        id: customer.customer_id,
        email: customer.email
    }
    try {
        const token = await sign(payload, process.env.SECRET)
        return res.status(200).cookie('token', token, {httpOnly: true}).json({
            success: true,
            message: 'Logged in successfully'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.protectedRoute = async (req, res) => {
    try {     
        return res.status(200).json({
            info: 'protected info'
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.logoutCustomers = async (req, res) => {
    try {
        return res.status(200).clearCookie('token', {httpOnly: true }).json({
            success: true,
            message: 'Logged out successfully'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}