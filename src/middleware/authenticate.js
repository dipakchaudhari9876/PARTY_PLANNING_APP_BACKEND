const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('./../model/UserSchema')
const Proposal = require('./../model/VendorSchema')

const authenticate = async(req,res,next)=>{
    try{
        const token = req.query.jwtoken
        if(!token){
            return res.status(400).json({error:"User not verified"})
        }
        const data = req.query.data

        let coll = data == "user" ? User : Proposal
        
        const verifyToken = jwt.verify(token,process.env.JWT_SEC)

        const user = await coll.find({_id:verifyToken.id})

        if(!user){
            return res.status(400).json({error:"User not verified"})
        }
        req.user = user
        req.userId = user._id
        next()


    }catch(err){
        return res.status(400).json({error:"User not verified"})
    }
}

module.exports = authenticate