const mongoose = require("mongoose");

const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const myEnv = dotenv.config();
dotenvExpand(myEnv);

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_ID,
	secretAccessKey: process.env.AWS_SECRET_KEY
});

exports.deleteProductPhoto = async ( photos ) => {
	// console.log(photos);
	for (let i = 0; i < photos.length; i++) {
		let key = photos[i].split('/')[4];
		const deleteFromS3 = new Promise((resolve, reject) => {
			try {
					s3.deleteObject({
							Bucket: `${process.env.AWS_PHOTO_S3}`,
							Key: `product/${key}`,
					}, (err, data) => resolve());
			} catch (err) {
					reject(err);
			}
		});
		deleteFromS3.then(async () => {
		}).catch((err) => {
				return false;
		});
	}
	
	return true;
}
