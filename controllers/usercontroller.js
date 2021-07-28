const router = require('express').Router();
const {UserModel} = require('../models');
const jwt = require('jsonwebtoken')

//Practice

router.get("/practice", (req, res) => {
  res.send("This is a practice route!");
});
  

//Sign Up

router.post('/register', async (req, res) => {
    let {email, password, firstName, lastName} = req.body.user;
    
    try {
        let User = await UserModel.create({
            email,
            password,
            firstName,
            lastName,
        });
        
        let token = jwt.sign({id: User.id}, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24})
        res.status(201).json({
            message: "User successfully registered",
            user: User,
            token
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to register user ${err}`,
        })
    }
});

//Login

router.post("/login", async (req, res) => {
  let { email, password } = req.body.user;

  try {
    let loginUser = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (loginUser) {

    let token = jwt.sign({id: loginUser.id},  process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24});

      res.status(200).json({
        user: loginUser,
        message: "User successfully logged in!",
        token

      });
    } else {
      res.status(401).json({
        message: `Login failed: ${err}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Failed to log user in: ${err}`,
    });
  }
});


module.exports = router;