const express = require('express');
const connect = require('./config/database');
const TweetRepo = require('./repository/tweet-repository');
const Comment = require('./models/comments');

const app = express();

const PORT = 3000;

app.listen(PORT, async () => {
    console.log('Server started at ', PORT);
    await connect();
    console.log('MongoDB server connected');

    // await Tweet.create({content: "First Tweet", userEmail: "anm@gmail.com"});
    // await Tweet.create({content: "Second Tweet", userEmail: "anm@gmail.com"});

    const tr = new TweetRepo();
    // tr.createTweet({content: "Third Tweet", userEmail: "aditya@gmail.com"});
    // const tweet = await tr.updateTweet('63db07e5b4e752b7ab255b51', {content: "Third Tweet updated 2"});
    // console.log(tweet);

    // const tweet = await tr.readTweet('63db07e5b4e752b7ab255b51');
    // const comment = await Comment.create({content: "First Comment", userEmail: "xyz@gmail.com"});
    // tweet.comments.push(comment);
    // tweet.save();
    // console.log(tweet);

    const tweet = await tr.readTweet('63db07e5b4e752b7ab255b51');
    const tweetwithComments = await tr.readTweetwithComments('63db07e5b4e752b7ab255b51');

    console.log(tweet);
    console.log("************************************************");
    console.log(tweetwithComments);
});