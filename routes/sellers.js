const express = require('express');
const passport = require('passport');
const router = express.Router();

// Load Seller Model
const Seller = require('../models/Seller');
// Load User Seller
const User = require('../models/User');
// Load Input Validation
const validateSellerInput = require('../validation/seller');

// @route       GET api/seller/test
// @desc        test seller route
// @access      Public
router.get('/test', (req, res) => res.json({ msg: 'Seller Works' }));

// @route       GET api/seller
// @desc        Get current users seller
// @access      Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Seller.findOne({ user: req.user.id })
      .populate('user', ['name'])
      .then(seller => {
        if (!seller) {
          errors.message = 'There is no seller profile for this user';
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  },
);

// @route       GET api/profile/all
// @desc        Get All profiles
// @access      Public
router.get('/all', (req, res) => {
  const errors = {};
  Seller.find()
    .populate('user', ['name'])
    .then(sellers => {
      if (!sellers) {
        errors.message = 'There are no sellers profile';
        return res.status(404).json;
      }
      res.json(sellers);
    })
    .catch(err => res.status(404).json(err));
});

// @route       GET api/seller/handle/:handle
// @desc        Get seller by handle
// @access      Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route       GET api/sellers/user/:user_id
// @desc        Get profile by user_id
// @access      Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route       POST api/seller
// @desc        Create current users seller profile
// @access      Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('Passou 1');
    const { errors, isValid } = validateSellerInput(req.body);
    console.log('Passou 2');
    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log('Passou 3');
    // console.log("AQUI AAAAAAA");
    // console.log(req.body);
    // Get filds
    const sellerFields = {};
    sellerFields.user = req.user.id;
    sellerFields.handle = req.body.handle;
    sellerFields.company = req.body.company;
    sellerFields.website = req.body.website;
    sellerFields.location = req.body.location;
    // Social stuff
    sellerFields.social = {};
    sellerFields.social.youtube = req.body.youtube;
    sellerFields.social.twitter = req.body.twitter;
    sellerFields.social.facebook = req.body.facebook;
    sellerFields.social.instagram = req.body.instagram;

    console.log('Passou 4');

    Seller.findOne({ user: req.user.id }).then(seller => {
      if (seller) {
        //update
        // handle user that already has a seller
        errors.message = 'User already has a seller';
        res.status(400).json(errors);
      } else {
        // create
        // Check if handle exists
        Seller.findOne({ handle: sellerFields.handle }).then(seller => {
          if (seller) {
            // errors.handle = 'That handle already exists';
            errors.message = 'That handle already exists';
            res.status(400).json(errors);
          }
          // Save Seller Profile
          new Seller(sellerFields).save().then(seller => res.json(seller));
        });
      }
    });
  },
);

// @route       DELETE api/profile/
// @desc        Delete user and profile
// @access      Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => User.findOneAndRemove({ _id: req.user.id }))
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json(err));
  },
);

module.exports = router;
