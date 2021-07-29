const router = require('express').Router();
const {UserModel} = require('../models');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validateJWT = require('../middleware/validate-session');


router.post('/register', async (req, res) => {
    let {email, 
        password, 
        firstName, 
        lastName
    } = req.body.user;
    
    try {
        let User = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 7),
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


// Login

router.post("/login", validateJWT, async (req, res) => {
    const { email, password } = req.body.user;
    try {
        let loginUser = await UserModel.findOne({
            where: {
                email: email
            }
        });


        if (loginUser) {

        let passwordHashComprasion = await bcrypt.compare(password, loginUser.password);

            if(passwordHashComprasion) {
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
                
                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "User not authorized"
                })
            }
        } else {
            res.status(401).json({
                message: 'Incorrect email or password'
            });
        }
        
    } catch (err) {
        res.status(500).json({
            message: `Failed to login ${err}`
        })
    }
});

module.exports = router;