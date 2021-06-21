const mongoose = require("mongoose");
const { uuid } = require('uuidv4');

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const myEnv = dotenv.config();
dotenvExpand(myEnv);

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_ID,
	secretAccessKey: process.env.AWS_SECRET_KEY
});

exports.deleteUserPhoto = async ( key ) => {
    const deleteFromS3 = new Promise((resolve, reject) => {
        try {
            s3.deleteObject({
                Bucket: `${process.env.AWS_PHOTO_S3}`,
                Key: `user/${key}`,
            }, (err, data) => resolve());
        } catch (err) {
            reject(err);
        }
    });
    deleteFromS3.then(async () => {
        return true;
    }).catch((err) => {
        return false;
    });
    return false;
}
