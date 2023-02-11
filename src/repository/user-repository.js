const CrudRepository = require('./crud-repository');
const User = require('../models/user');

class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async findUserbyEmail(data){
        try{
            const user = await User.findOne(data);
            return user;
        } catch(error){
            error = {...error, layer: "Repository"};
            console.log(error);
            throw error;
        }
    }

    async readwithTweets(data){
        try{
            const user = await User.findOne(data).populate({path: 'tweets'});
            return user;
        } catch(error){
            error = {...error, layer: "Repository"};
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserRepository;