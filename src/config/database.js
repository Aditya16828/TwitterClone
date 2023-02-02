const mongoose = require("mongoose");

const URL = 'mongodb://localhost:27017/twitter_DEV_DB';
const connect = async () => {
    await mongoose.connect(URL);
}

module.exports = connect;