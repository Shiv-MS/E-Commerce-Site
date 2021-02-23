const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');
//this route is creating a new User, we will need our input to send,{
// name:req.body.name, email:req.body.email, password: req.body.email}, we have to create a post 
// post request from our react application
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid)
    return res.status(400).json(errors);

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (user)
      return res.status(400).json({ email: 'Email already exists' });

    const newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser.save().then(user => res.json(user)).catch(err => console.log(err));
      });
    });
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid)
    return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user)
      return res.status(401).json({ message: 'Invalid email or password' });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(401).json({ message: 'Invalid email or password' });

      const payload = {
        id: user.id,
        name: user.name,
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 31556926 }, (err, token) => {
        if (err)
          return res.status(400).json({ tokenerror: 'There was a problem updating your security token' });

        res.send({
          success: true,
          token: `Bearer ${token}`,
        });
      });
    });
  });
});
// router.post('logout',(req,res)=>{

// })

module.exports = router;
