const passport = require('passport')

exports.customerAuth = passport.authenticate('jwt', { session: false })