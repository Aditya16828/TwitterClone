const {TweetRepository, HashtagRepository} = require('../repository/index');

class Tweet_Service {
    constructor(){
        this.tweetrepo = new TweetRepository();
        this.hashtagrepo = new HashtagRepository();
    }

    async create(data){
        const content = data.content;

        // find for hashtags using regex
        let tags = content.match(/#[a-zA-Z0-9_]+/g);
        tags = tags.map((tag) => tag.substring(1));

        // console.log(tags);

        let oldtags = await this.hashtagrepo.findByName(tags);
        let oldtagstitle = [];
        oldtagstitle = oldtags.map(tag => tag.title);
        // console.log("Old Tags:", oldtags);
        let newtags = tags.filter(tag => (!oldtagstitle.includes(tag)));
        // console.log("new Tags:", newtags);

        const tweet = await this.tweetrepo.createTweet(data);

        newtags = newtags.map(tag => {
            return {title: tag, tweets: [tweet.id]};
        });

        oldtags.forEach(tag => {
            tag.tweets.push(tweet.id);
            tag.save();
        })

        const response = await this.hashtagrepo.createHashtags(newtags);
        
        // console.log(response);
        return tweet;
    }
}

module.exports = Tweet_Service;