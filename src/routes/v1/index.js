const express = require('express');

const {createTweet} = require('../../controller/tweet-controller');

const router = express.Router();

router.post('/tweet', createTweet);

module.exports = router;