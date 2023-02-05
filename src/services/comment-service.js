const {CommentRepository, TweetRepository} = require('../repository/index');

class CommentService {
    constructor(){
        this.commentrepository = new CommentRepository();
        this.tweetrepository = new TweetRepository();
    }

    async createComment(modelType, modelId, userId, content){
        try{
            if(modelType == 'Tweet'){
                var commentable = await this.tweetrepository.read(modelId);
            } else if (modelType == 'Comment') {
                var commentable = await this.commentrepository.read(modelId);
            } else {
                throw new Error("Model Type mismatch");
            }

            const newComment = await this.commentrepository.create({
                content: content,
                user: userId,
                commentableId: modelId,
                onModel: modelType
            });

            commentable.comments.push(newComment);
            await commentable.save();
            return commentable;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = CommentService;