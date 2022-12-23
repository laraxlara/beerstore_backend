const db = require('../db')

exports.getPosts = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM posts')
        console.log(result)
        return res.status(200).json({
            success: true,
            results: result.rows.length,
            posts: result.rows,
        })
    } catch (error) {
        console.log(error.message)
    }
}