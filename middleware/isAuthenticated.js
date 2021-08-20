'use strict'
const auth = require('basic-auth')
const bcrypt = require('bcryptjs')
const { User } = require('../models')

// for some reason writing this as an arrow function throws a non sense syntax error
module.exports = async function isAuthenticated (req, res, next) {
    try{
        const cred = auth(req)
        if(cred){
            const {name, pass} = cred
            // find user by email
            const foundUser = await User.findOne({where: {emailAddress: name}})
            if(foundUser){
                const auth = bcrypt.compareSync(pass, foundUser.password)
                if(auth){
                    req.currentUser = foundUser
                    next()
                }
                else{
                    const err = new Error("Invalid Credentials")
                    err.status = 401
                    next(err)
                }
            }
        }
        // Build out the 401 error
        else{
            const err = new Error( "Access Denied")
            err.status = 401
            next(err)
        }
    }
    catch(err){
        next(err)
    }
}



