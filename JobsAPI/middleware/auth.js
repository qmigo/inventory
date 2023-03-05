const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors/index')

const authenticateUser = async (req, res, next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnauthenticatedError('Invalid authorization header')

    const token = authHeader.split(' ')[1]
    
    try {
        const payLoad = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { name: payLoad.name, userId: payLoad.userId }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')   
    }
}

module.exports = authenticateUser