const express = require('express');

const {createTweet} = require('../../controller/tweet-controller');
const {toggleLike} = require('../../controller/like-controller');
const {createComment} = require('../../controller/comment-controller');

const router = express.Router();

router.post('/tweet', createTweet);
router.post('/like', toggleLike);
router.post('/comment', createComment);

module.exports = router;