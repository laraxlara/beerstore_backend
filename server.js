const dotenv = require('dotenv')
dotenv.config()
const morgan = require('morgan');
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const cookieParser = require('cookie-parser')
const passport = require('passport')

require('./middleware/passportMiddleware')
const config = require('./config');

//middlewares
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(morgan('tiny'))
app.use(cookieParser())
app.use(passport.initialize())

//add routes
const authRoutes = require('./routes/auth') 
const productsRoutes = require('./routes/products')
const postsRoutes = require('./routes/posts')

//initialize routes
app.use('/api', authRoutes)
app.use('/api', productsRoutes)
app.use('/api', postsRoutes)

// start app
const appStart = () => {
    try {
        app.listen(process.env.SERVER_URL || port, () => {
            console.log(`The app started on port ${port}`)
        })
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

appStart()