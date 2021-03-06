const express = require('express');
const passport = require('passport');
const router = express.Router();

// Load Seller Model
const Seller = require('../models/Seller');
// Load User Seller
const User = require('../models/User');
// Load Input Validation
const validateSellerInput = require('../validation/seller');

// @route       GET api/sellers/test
// @desc        test seller route
// @access      Public
router.get('/test', (req, res) => res.json({ msg: 'Seller Works' }));

// @route       GET api/sellers
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
        return res.json(seller);
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
// @desc        Get seller profile by user_id
// @access      Private
router.get(
  '/user/:user_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};
    Seller.findOne({ user: req.params.user_id })
      .populate('user', ['name'])
      .then(seller => {
        if (!seller) {
          errors.message = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        return res.json(seller);
      })
      .catch(err => res.status(404).json(err));
  },
);

// @route       POST api/sellers
// @desc        Create current users seller profile
// @access      Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSellerInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Get fields
    const sellerFields = { ...req.body };
    sellerFields.user = req.user.id;
    sellerFields.social = {};
    sellerFields.social.youtube = req.body.youtube;
    sellerFields.social.twitter = req.body.twitter;
    sellerFields.social.facebook = req.body.facebook;
    sellerFields.social.instagram = req.body.instagram;

    Seller.findOne({ user: req.user.id }).then(seller => {
      if (seller) {
        //update
        // handle user that already has a seller
        errors.message = 'User already has a seller';
        return res.status(400).json(errors);
      } else {
        // Para fins de desenvolvimento vou deixar
        // o mesmo usuario ter mais de uma marca
        // create
        // Check if handle exists
        Seller.findOne({ handle: sellerFields.handle }).then(seller => {
          if (seller) {
            // errors.handle = 'That handle already exists';
            errors.message = 'That handle already exists';
            return res.status(400).json(errors);
          }
          // Save Seller Profile
          new Seller(sellerFields).save().then(seller => res.json(seller));
        });
      }
    });
  },
);

// @route       PUT api/profile
// @desc        Update current users seller profile
// @access      Private
router.put(
  '/:seller_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSellerInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Get fields
    const sellerFields = { ...req.body };
    sellerFields.user = req.user.id;
    sellerFields.social = {};
    sellerFields.social.youtube = req.body.youtube;
    sellerFields.social.twitter = req.body.twitter;
    sellerFields.social.facebook = req.body.facebook;
    sellerFields.social.instagram = req.body.instagram;

    Seller.findOne({ user: req.user.id, _id: req.params.seller_id }).then(
      seller => {
        if (seller) {
          //update
          Seller.findOneAndUpdate(
            { user: req.user.id },
            { $set: sellerFields },
            { new: true },
          ).then(seller => res.json(seller));
        } else {
          errors.message = 'There is no Seller Profile for this user';
          res.status(400).json(errors);
        }
      },
    );
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
