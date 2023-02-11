const { TweetRepository, HashtagRepository, UserRepository } = require("../repository/index");

class TweetService {
    constructor() {
        this.tweetrepo = new TweetRepository();
        this.hashtagrepo = new HashtagRepository();
        this.userRepo = new UserRepository();
    }

    async #updateTweets(userid, data){
        try{
            const user = await this.userRepo.read(userid);
            user.tweets.push(data);
            user.save();
            return user;
        } catch(error){
            console.log(error);
            throw error;
        }
    }

    async createTweet(data) {
        try {
            let data1 = {content: data.content, images: data.images};
            const tweet = await this.tweetrepo.create(data1);
            await this.#updateTweets(data.user._id, tweet._id);

            const content = data.content;

            // find for hashtags using regex
            let tags = content.match(/#[a-zA-Z0-9_]+/g);
            if (tags) {
                tags = tags.map((tag) => tag.substring(1));


                let oldtags = await this.hashtagrepo.findByName(tags);
                let oldtagstitle = [];
                oldtagstitle = oldtags.map((tag) => tag.title);
                let newtags = tags.filter((tag) => !oldtagstitle.includes(tag));

                newtags = newtags.map((tag) => {
                    return { title: tag, tweets: [tweet.id] };
                });

                oldtags.forEach((tag) => {
                    tag.tweets.push(tweet.id);
                    tag.save();
                });

                const response = await this.hashtagrepo.createHashtags(newtags);
            }

            return tweet;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = TweetService;
