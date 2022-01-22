const jwt = require('jsonwebtoken')

jwtsecret = "thisisaverylongjwtsecret"

const verifyToken = (req, res, next) => {
    if (!req.body.token) {
        return res.send({result:false, err:"Need access token"})
    }
    try {
        const decodeToken = jwt.verify(req.body.token, jwtsecret)
        req.userid = decodeToken.userid
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({result: false, err: "Invalid access token"})
    }
    
}

module.exports = verifyToken