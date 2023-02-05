const { LikeRepository, TweetRepository } = require('../repository/index');

class LikeService {
    constructor() {
        this.likerepo = new LikeRepository();
        this.tweetrepo = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) { // /api/v1/likes/toggle?id=modelid&type=Tweet
        try {
            if (modelType == 'Tweet') {
                var likeable = await this.tweetrepo.read(modelId);

            } else if (modelType == 'Comment') {
                // TODO
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