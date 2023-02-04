const Hashtag = require('../models/hashtag');

class HashtagRepository{
    async createHashtag(data){
        try {
            const tag = await Hashtag.create(data);
            return tag;
        } catch (error) {
            console.log(error);
        }
    }

    async createHashtags(data){
        try {
            const tags = await Hashtag.insertMany(data);
            return tags;
        } catch (error) {
            console.log(error);
        }
    }

    async readHashtag(id){
        try {
            const tag = await Hashtag.findById(id);
            return tag;
        } catch (error) {
            console.log(error);
        }
    }

    async updateHashtag(id, data){
        try {
            const tag = await Hashtag.findByIdAndUpdate(id, data, {new: true});
            return tag;
        } catch (error) {
            console.log(error);
        }
    }

    async removeHashtag(id){
        try {
            const tag = await Hashtag.findByIdAndRemove(id);
            return tag;
        } catch (error) {
            console.log(error);
        }
    }

    async findByName(titleList){
        try {
            const tags = await Hashtag.find({
                title: {$in: titleList}
            });
            return tags;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = HashtagRepository;