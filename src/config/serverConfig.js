const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    SECRETORKEY: process.env.SECRETORKEY,
    BUCKETNAME: process.env.BUCKETNAME
}