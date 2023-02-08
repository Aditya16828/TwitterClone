const { LikeRepository, TweetRepository, CommentRepository } = require('../repository/index');

class LikeService {
    constructor() {
        this.likerepo = new LikeRepository();
        this.tweetrepo = new TweetRepository();
        this.commentrepo = new CommentRepository();
    }

    async toggleLike(modelId, modelType, userId) { // /api/v1/likes/toggle?id=modelid&type=Tweet
        try {
            if (modelType == 'Tweet') {
                var likeable = await this.tweetrepo.read(modelId);

            } else if (modelType == 'Comment') {
                var likeable = await this.commentrepo.read(modelId);
            } else {
                throw new Error('ModelType mismatch');
            }

            const exists = await this.likerepo.findbyUseridAndModelid({
                onModel: modelType,
                user: userId,
                likedId: modelId
            });

            console.log(exists);

            if (exists) {
                likeable.likes.pull(exists.id);
                await likeable.save();
                await exists.remove();
            } else {
                const newLike = await this.likerepo.create({
                    onModel: modelType,
                    user: userId,
                    likedId: modelId
                });
                likeable.likes.push(newLike);
                await likeable.save();
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = LikeService;