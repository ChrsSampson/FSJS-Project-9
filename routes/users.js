const express = require('express');
const router = express.Router();
const catchAsync = require('../middleware/catchAsync');
const bcrypt = require('bcryptjs');

const User = require('../models').User

// Show all users
router.get('/', catchAsync(async (req, res) => {
    try{
    const users = await User.findAll()
    res.status(200).json(users)
    }
    catch(e){
        res.status(400).json({Error: e.message})
    }
}));

// Create a new user
router.post('/', catchAsync(async (req, res) => {
    try{
        
        const {firstName, lastName, emailAddress, password} = req.body
        // hash the plain text password
        const HashedPassword = await bcrypt.hash(password, 10)

        await User.create({firstName, lastName, emailAddress, password: HashedPassword})
        res.status(201).location('/')
    }
    catch(e){
        res.status(400).json({Error: e.message})
    }
}));


module.exports = router;