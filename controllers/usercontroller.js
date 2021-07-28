const router = require('express').Router();
const {UserModel} = require('../models');
// const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    let {email, password, firstName, lastName} = req.body.user;
    try {
        
        let User = await UserModel.create({
            email,
            password,
            firstName,
            lastName
        });
        
        // let token = jwt.sign({id: User.id}, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24})
        res.status(201).json({
            message: "User successfully registered",
            user: User,
            // token
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to register user ${err}, ${User} `,
        })
    }
});

// Login

router.post("/login", async (req,res) => {
    const { email, password } = req.body.user
    try {
        let loginUser = await UserModel.findOne({
            where: {
                email: email
            }
        })
        if (loginUser) {
            res.status(200).json({
                user: loginUser,
                message: "User logged in"
            })
        } else {
            res.status(401).json({
                message: "User not authorized"
            })
        }
        
    } catch (err) {
        res.status(500).json({
            message: "Failed to login"
        })
    }
})

module.exports = router;