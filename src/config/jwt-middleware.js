const JWT = require('passport-jwt');
const { SECRETORKEY } = require('./serverConfig');
const User = require('../models/user');

const jwtStrategy = JWT.Strategy;
const extractJwt = JWT.ExtractJwt;

const opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRETORKEY
};

const passportAuth = function (passport) {
    try {
        passport.use(new jwtStrategy(opts, async function (toBeAuth, done) {
            const user = await User.findById(toBeAuth.id);
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }));
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = { passportAuth };