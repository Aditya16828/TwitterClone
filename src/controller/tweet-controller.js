const { TweetService } = require("../services/index");
const {upload} = require('../config/fileUpload-S3-config');

const tweetservice = new TweetService();
const singleUploader = upload.single('image');

const createTweet = async (req, res) => {
    try {
        // const response = await tweetservice.createTweet(req.body);

        singleUploader(req, res, async function (err, data){
            if(err){
                return res.status(500).json({
                    err: err
                });
            }

            const response = await tweetservice.createTweet(req.body);
            console.log("Image link", req.file);
            return res.status(200).json({
                success: true,
                message: "Successfully created a new tweet",
                data:  response,
                err: {}
            });
        });

        // return res.status(201).json({
        //     data: response,
        //     err: {},
        //     message: "Successfully created Tweet",
        //     success: true,
        // });
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
