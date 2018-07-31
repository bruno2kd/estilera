var express = require('express');
const bcrypt = require('bcryptjs');

var router = express.Router();

// Load Input Validation
const validateRegisterInput = require('../validation/register');
// Load User Model
const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// @route       POST api/users/register
// @desc        Register User
// @access      Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              user.password = undefined;
              res.json(user);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
