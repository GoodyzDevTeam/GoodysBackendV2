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

exports.addProductPhoto = async (files) => {
	let photos = [];
	if (!files) return [];
	console.log(files);
	for (let i = 0; i < files.length; i++) {

		const myFile = files[i].originalname.split('.');
		const fileType = myFile[myFile.length - 1];
		const key = `${uuid()}.${fileType}`;
		const params = {
			Bucket: `${process.env.AWS_PHOTO_S3}`,
			Key: `product/${key}`,
			Body: new Buffer(files[i].buffer),
			ACL: 'public-read'
		}
		
		const uploadPromise = new Promise((resolve, reject) => {
			s3.upload(params, (err, data) => {
				if (err) {
					reject(err);
				}
				resolve(data);
			});
		});

		await uploadPromise.then(async data => {
			photos.push(`https://application-photo.s3.us-west-1.amazonaws.com/product/${key}`);
		}).catch(err => {
			console.log(err);
			return res.json({success: false, status: 500});
		});	
	}
	
	return photos;
}