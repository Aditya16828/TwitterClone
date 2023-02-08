const {LikeService} = require('../services/index');

const likeservice = new LikeService();

const toggleLike = async (req, res) => {
    try{
        // console.log(req);
        const response = await likeservice.toggleLike(req.query.modelId, req.query.modelType, req.user.id);
        return res.status(200).json({
            data: response,
            message: "Successfully toggled like",
            err: {},
            success: true
        });
    } catch(error) {
        error = {...error, LayerName: "Controller"};
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Cannot toggle like",
            err: error,
            success: false
        });
    }
}

module.exports = {toggleLike};