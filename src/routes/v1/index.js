const express = require('express');

const {createTweet} = require('../../controller/tweet-controller');
const {toggleLike} = require('../../controller/like-controller');
const {createComment} = require('../../controller/comment-controller');
const {signup, login} = require('../../controller/user-controller');
const {authenticate} = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/tweet', createTweet);
router.post('/like', authenticate, toggleLike);
router.post('/comment', authenticate, createComment);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;