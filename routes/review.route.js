const express = require('express');
const router = express.Router();
const multer = require('multer');

const { auth } = require('../auth/auth');
const { getAllReviewsController } = require('../controllers/review/get.all.controller');
const { replyController } = require('../controllers/review/reply.controller');

const storage = multer.memoryStorage({
	destination: (req, files, callback) => {
		callback(null, '');
	}
})

const upload = multer();

router.get('/', auth, getAllReviewsController);
router.put('/reply', auth, replyController);

module.exports = router;
