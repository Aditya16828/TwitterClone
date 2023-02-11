const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const dotenv = require('dotenv');
const {BUCKETNAME} = require('./serverConfig');

dotenv.config();

aws.config.update({
    region: process.env.AWSREGION,
    secretAccessKey: process.env.AWSSECRETACCESSKEY,
    accessKeyId: process.env.ACCESSKEYID
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKETNAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

module.exports = {upload};