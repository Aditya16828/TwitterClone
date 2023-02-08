const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {SALT_ROUNDS, SECRETORKEY} = require('../config/serverConfig');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {timestamps: true});

userSchema.pre('save', function (next) {
    const user = this;
    const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS));
    const encryptedPassword = bcrypt.hashSync(user.password, salt);
    user.password = encryptedPassword;
    next();
});

userSchema.methods.comparePassword = async function compare(password){
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.genJWT = async function generate(){
    return jwt.sign({id: this._id, email: this.userEmail}, SECRETORKEY, {expiresIn: '2d'});
}

const User = mongoose.model('User', userSchema);

module.exports = User;