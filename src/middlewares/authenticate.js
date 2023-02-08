const passport = require('passport');

const authenticate = function (req, res, next){
    try{
        passport.authenticate('jwt', function (err, user){
            if(err){
                next(err);
            } else if(!user){
                return res.status(500).json({
                    message: "Unauthorized access"
                });
            } else {
                console.log(user);
                req.user = user;
                next();
            }
        })(req, res, next);
    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports = {authenticate};