const { Router } = require('express')
const { getPosts } = require('../controllers/posts')
const router = require('./auth')

router.get('/posts', getPosts)

module.exports = router