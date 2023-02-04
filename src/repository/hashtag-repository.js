const Hashtag = require('../models/hashtag');
const CrudRepository = require('./crud-repository');

class HashtagRepository extends CrudRepository{
    constructor(){
        super(Hashtag);
    }

    async createHashtags(data){
        try {
            const tags = await Hashtag.insertMany(data);
            return tags;
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