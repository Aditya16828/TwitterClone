const express = require('express');

const {createTweet} = require('../../controller/tweet-controller');
const {toggleLike} = require('../../controller/like-controller');

const router = express.Router();

router.post('/tweet', createTweet);
router.post('/like', toggleLike);

module.exports = router;