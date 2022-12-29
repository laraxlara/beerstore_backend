const db = require('../db')
const dotenv = require('dotenv')
dotenv.config()
const passport = require('passport')
const { Strategy } = require('passport-jwt')

const cookieExtractor = function (req) {
    let token = null
    if (req && req.cookies) token = req.cookies['token']
    return token
}
  
const opts = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: cookieExtractor,
}

passport.use(
    new Strategy(opts, async ({ id }, done) => {
      try {
        const { rows } = await db.query(
          'SELECT customer_id, email FROM customers WHERE customer_id = $1',
          [id]
        )
  
        if (!rows.length) {
          throw new Error('401 not authorized')
        }
  
        let customer = { id: rows[0].customer_id, email: rows[0].email }
  
        return await done(null, customer)
      } catch (error) {
        console.log(error.message)
        done(null, false)
      }
    })
  )