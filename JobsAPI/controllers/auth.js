const User = require('../model/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors/index')

const login = async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password)
    throw new BadRequestError('Plesase provide a password and email')

    const user = await User.findOne({ email })
    if(!user)
    throw new UnauthenticatedError('Invalid Credentials')

    const isPasswordCorrect = await user.comparePassword(password)

    if(isPasswordCorrect===false)
    {   
        throw new UnauthenticatedError('Incorrect Password') 
    }
    const token = user.createJWT()
    return res.status(StatusCodes.OK).send({ name:user.name, token })
}

const register = async(req, res)=>{
    
    const user  = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({name: user.name, token})
    
}

module.exports = {
    login,
    register
}