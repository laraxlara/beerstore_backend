const db = require('../db')

exports.getProducts = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM products')
        return res.status(200).json({
            success: true,
            results: response.rows.length,
            products: response.rows,
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.getProduct = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM products WHERE id = $1', [req.params.id])
        return res.status(200).json({
            success: true,
            products: response.rows,
        })
    } catch (error) {
        console.log(error.message)
    }
}

