const { UserService } = require('../services/index');

const userservice = new UserService();

const signup = async (req, res) => {
    try {
        console.log("Hitting Controller");
        const data = {
            userEmail: req.body.email,
            password: req.body.password,
            name: req.body.name
        };
        const response = await userservice.create(data);
        return res.status(200).json({
            data: response,
            message: "Successfully created user",
            err: {},
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Not able to create User, something went wrong",
            err: error,
            success: false
        })
    }
}

const login = async (req, res) => {
    try{
        const response = await userservice.login({userEmail: req.body.email, password: req.body.password});
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully logged in, plz save the token received",
            err: {}
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            data: {},
            success: true,
            message: "Something went wrong, plz try again",
            err: error
        });
    }
}

module.exports = {signup, login};