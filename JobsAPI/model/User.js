const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Enter a name'],
        minlength: 3,
        maxlenght: 12 
    },
    email:{
        type: String,
        required: [true, 'Enter an email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Enter a valid email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Enter a password'],
        minlength: 6,
    },
})

UserSchema.pre('save', async function(){
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
})

UserSchema.methods.createJWT = function()
{
    return jsonwebtoken.sign({
        userId: this._id,
        name: this.name
    }, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function(password)
{
    const result = await bcryptjs.compare(password, this.password)
    return result
}
module.exports = mongoose.model('User', UserSchema)