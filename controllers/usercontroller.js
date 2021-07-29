const router = require('express').Router();
const {UserModel} = require('../models');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {
    let {email, 
        password, 
        firstName, 
        lastName
    } = req.body.user;
    
    try {
        let User = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 14),
            firstName,
            lastName,
        });
        
        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
        res.status(201).json({
            message: "User successfully registered",
            user: User,
            sessionToken: token
        })
    } catch (err) {
        res.status(500).json({
            message: `Failes to register user ${err}`
        })
    }
});

module.exports = router;