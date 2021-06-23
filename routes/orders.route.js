const express = require('express');
const router = express.Router();
const multer = require('multer');

const { auth } = require('../auth/auth');
const { getOrdersController } = require('../controllers/orders/get.orders.controller');
const storage = multer.memoryStorage({
	destination: (req, files, callback) => {
		callback(null, '');
	}
})

const upload = multer();

router.get('/', auth, getOrdersController);

module.exports = router;
