const {UserRepository} = require('../repository/index');

class UserService {
    constructor(){
        this.userRepo = new UserRepository();
    }

    async create(data){
        try{
            console.log(data);
            console.log("Hitting Service");
            const user = await this.userRepo.create(data);
            return user;
        } catch(error) {
            error = {...error, origin: "UserRepository"};
            console.log(error);
            throw error;
        }
    }

    async login(data){
        try{
            const user = await this.userRepo.findUserbyEmail({userEmail: data.userEmail});
            if(!user){
                throw new Error("User Not found");
            }

            if(!user.comparePassword(data.password)){
                throw new Error("Password mismatch, plz try again");
            }

            const token = user.genJWT();
            return token;
        } catch(error){
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserService;