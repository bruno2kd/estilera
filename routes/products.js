const express = require('express');
const passport = require('passport');

const router = express.Router();

// Load Post Model
const Product = require('../models/Product');
// Load User Model
const User = require('../models/User');
// Load Profile Model
const Seller = require('../models/Seller');
// Load Input Validation
const validateProductInput = require('../validation/product');

// @route       GET api/products/test
// @desc        test products route
// @access      Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route       GET api/posts/
// @desc        Read all posts
// @access      Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ message: 'No post found' }));
});

// @route       POST api/products/
// @desc        create new product
// @access      Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    console.log('Passou 1');
    const { errors, isValid } = validateProductInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    try {
      console.log('Passou 2');
      const seller = await Seller.findOne({ user: req.user });
      console.log(seller);

      console.log('Passou 3');
      const newProduct = new Product({
        name: req.body.name,
        seller: seller.id,
      });
      console.log('Passou 4');

      newProduct.save().then(product => res.json(product));
    } catch (error) {
      return res.status(400).json('Something went wrong');
    }
  },
);

// @route       DELETE api/posts/:post_id
// @desc        test posts route
// @access      Private
router.delete(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check for post owner
    Post.findById(req.params.post_id)
      .then(post => {
        // post.user eh obj req.user.id eh string
        if (post.user == req.user.id) {
          post
            .remove()
            .then(() => res.json({ post_id: req.params.post_id }))
            .catch(err => res.status(404).json(err));
        } else {
          return res.status(401).json({ message: 'User not authorized' });
        }
      })
      .catch(err => res.status(404).json({ message: 'Post not found' }));
  },
);

// @route       POST api/posts/like/:post_id
// @desc        Toggle like posts route
// @access      Private
router.post(
  '/like/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check for post owner
    Post.findById(req.params.post_id)
      .then(post => {
        // const jaLiked = post.likes.filter(
        //   like => like.user.toString() === req.user.id
        // );
        const jaLiked = post.likes.find(x => x.user == req.user.id);
        if (jaLiked) {
          filterLiked = post.likes.filter(
            like => like.user.toString() !== req.user.id,
          );
          post.likes = filterLiked;
          post.save().then(post => res.json(post));
        } else {
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        }
      })
      .catch(err => res.status(404).json({ message: 'Post not found' }));
  },
);

// @route       POST api/posts/unlike/:post_id
// @desc        unlike posts route
// @access      Private
router.post(
  '/unlike/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // check for post owner
    Post.findById(req.params.post_id)
      .then(post => {
        filterLiked = post.likes.filter(
          like => like.user.toString() !== req.user.id,
        );
        post.likes = filterLiked;
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ message: 'Post not found' }));
  },
);

// @route       POST api/posts/comment/:post_id
// @desc        Comment posts route
// @access      Private
router.post(
  '/comment/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.post_id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ message: 'Post not found' }));
  },
);

// @route       DELETE api/posts/comment/:post_id/:comment_id
// @desc        Delete post comments
// @access      Private
router.delete(
  '/comment/:post_id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        filterComment = post.comments.filter(
          cmt => cmt._id.toString() !== req.params.comment_id,
        );
        post.comments = filterComment;
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ message: 'Post not found' }));
  },
);

module.exports = router;
