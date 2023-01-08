module.exports = {
    environment: process.env.NODE_ENV || 'production',
    server: {
        domain: process.env.DOMAIN || '.onrender.com',
        secret: process.env.SECRET,
    }
}