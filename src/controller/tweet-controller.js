const { TweetService } = require("../services/index");

const tweetservice = new TweetService();

const createTweet = async (req, res) => {
    try {
        const response = await tweetservice.createTweet(req.body);
        return res.status(201).json({
            data: response,
            err: {},
            message: "Successfully created Tweet",
            success: true,
        });
    } catch (error) {
        // error = { ...error, fromLayer1: "Controller" };
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}

module.exports = {createTweet};
