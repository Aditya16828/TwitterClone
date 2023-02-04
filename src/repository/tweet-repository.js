const Tweet = require('../models/tweet');
const CrudRepository = require('./crud-repository');

class TweetRepository extends CrudRepository{
    constructor(){
        super(Tweet);
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
}

module.exports = TweetRepository;