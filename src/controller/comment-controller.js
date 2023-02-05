const {CommentService} = require('../services/index');

const commentservice = new CommentService();

const createComment = async (req, res) => {
    try{
        const response = await commentservice.createComment(req.query.modelType, req.query.modelId, req.body.userId, req.body.content);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully commented",
            err: {}
        });
    } catch(error) {
        console.log(error);
        return res.status(501).json({
            data: {},
            success: false,
            err: error,
            message: "Unable comment"
        })
    }
}

module.exports = {createComment};