const Tweet = require('../models/tweet');

class Tweet_Repository{
    async createTweet(data){
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async readTweet(id){
        try {
            const tweet = await Tweet.findById(id);
            return tweet;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async readTweetwithComments(id){
        try {
            const tweet = await Tweet.findById(id).populate({path: 'comments'});
            return tweet;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async readAll(offset, limit){
        try {
            const tweets = await Tweet.find().skip(offset).limit(limit); // pagination
            return tweets;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateTweet(id, data){
        try {
            const tweet =  await Tweet.findByIdAndUpdate(id, data ,{new: true}); // new: true is required to return the new updated object
            return tweet;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    async deleteTweet(id){
        try {
            const tweet = await Tweet.findByIdAndRemove(id);
            return tweet;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = Tweet_Repository;