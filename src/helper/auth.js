require('dotenv')
const jwt = require('jsonwebtoken')

module.exports = {
    checkToken: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        console.log(token)
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.JWT_PRIVATE_KEY,(err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        } )
    },
}

