const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../model/User");
const Profile = require("../../model/Profile");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require('config');
const passport = require("passport");
const { session } = require("passport");
const secretOrKey  = config.get("secretOrKey");

// Register user
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required (at least 6 characters)").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    const { name, email, password } = req.body;
    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({errors:{email:{msg:"User already exists"}}})
      }

      user = new User({
        name,
        email,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      

      await user.save();
   
    // Return jsonwebtoken
     
      const payload = { _id: user.id, name: user.name }; // Create JWT Payload

      //Create profile

      const profile = new Profile({user:user.id})
      await profile.save();

      // Sign Token
      jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({
          success: true,
          
          token: "Bearer " + token
          
        });
      });
    } catch (err) {
      console.error(err.message);
      if(user){
        user.delete();
      }
      res.status(500).send("Server error");
    
  
    }
}
);
// Login user and receive jason webtoken
router.post(
  "/login",
  [
    check("email", "Email is required.").not().isEmpty(),
    check("password", "Password is required.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({errors:{email:{msg:"Email address not found"}}})
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({errors:{password:{msg:"Invalid password"}}})
      }

      // user match

      const payload = { _id: user.id, name: user.name }; // Create JWT Payload

      // Sign Token
      jwt.sign(payload, secretOrKey,{expiresIn:36000}, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token,
        });
      })

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ date: -1 });

    return res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get current user
router.get("/me",passport.authenticate("jwt",{session:false}), async (req, res) => {
  
  try {
    const user = await User.findOne({_id: req.user.id});

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
