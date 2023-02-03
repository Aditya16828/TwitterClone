const {TweetRepository} = require('../repository/index');

class Tweet_Service {
    constructor(){
        this.tweetrepo = new TweetRepository();
    }

    async create(data){
        const content = data.content;

        // find for hashtags using regex
        const tags = content.match(/#[a-zA-Z0-9_]+/g);
        tags = tags.map((tag) => tag.substring(1));

        const tweet = await this.tweetrepo.createTweet(data);
        return tweet;
    }
}