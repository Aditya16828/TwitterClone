const { TweetService } = require("../services/index");
const {upload} = require('../config/fileUpload-S3-config');

const tweetservice = new TweetService();
// const singleUploader = upload.single('image');
const multipleUploader = upload.array('images', 10);

const createTweet = async (req, res) => {
    try {
        multipleUploader(req, res, async function (err, data){
            if(err){
                return res.status(500).json({
                    err: err
                });
            }

            imgLocation = req.files.map(ele => ele.location);
            const payload = {...req.body, user: req.user._id, images: imgLocation};
            const response = await tweetservice.createTweet(payload);
            // const response = 2;
            // console.log("*********************************\n");
            console.log(payload);
            // console.log("*********************************\n");
            return res.status(200).json({
                success: true,
                message: "Successfully created a new tweet",
                data:  response,
                err: {}
            });
        });
    } catch (error) {
        error = { ...error, fromLayer1: "Controller" };
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
