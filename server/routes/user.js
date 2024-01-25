const { Router } = require('express');
const router = Router(); 
const User = require('../models/user') 
const Authorization = require('../middlerware/Authorization');
const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const SECRET_KEY = process.env.SECRET_KEY;


// Get all users
router.get('/', Authorization, async(req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Create a new user
router.post('/register', async(req, res) => {
    const {name , email, password} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = new User({
            name,
            email,
            password:hashedPassword
        })
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
            expiresIn: '1h',
            });   
        user = await user.save()
        const responseUserData= {UserId:user._id ,token}
        res.status(201).send(responseUserData)
    } catch (error) {
        res.status(500).send(error.message)
    }
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ error: "Details are missing" });
      }
  
      const foundUser = await User.findOne({ email });
  
      if (foundUser) {
        const passOk = bcrypt.compareSync(password, foundUser.password);
  
        if (passOk) {
          const token = jwt.sign({ userId: foundUser._id }, SECRET_KEY, {
            expiresIn: '1h',
          });
  
          // Set the token as a cookie
          res.cookie("token", token, { httpOnly: true }).status(200).json({
            userId: foundUser._id,
            message: "Login successful",
          });
        } else {
          res.status(401).json({ error: "Invalid password" });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get user By ID
router.get('/:id', Authorization, async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete user By ID
router.delete('/:id', Authorization, async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router