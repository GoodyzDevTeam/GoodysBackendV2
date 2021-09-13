const express = require('express');
const router = express.Router();
const multer = require('multer');

const { auth } = require('../auth/auth');
const { getOrdersController } = require('../controllers/orders/get.orders.controller');
const { addOrdersController } = require('../controllers/orders/add.orders.controller');
const { updateOrdersController } = require('../controllers/orders/update.orders.controller');
const { deleteOrdersController } = require('../controllers/orders/delete.orders.controller');
const { paymentIntentController } = require('../controllers/orders/payment.intent.controller');

const storage = multer.memoryStorage({
	destination: (req, files, callback) => {
		callback(null, '');
	}
})

const upload = multer();

router.get('/', auth, getOrdersController);
router.post('/', upload.any(), addOrdersController);
router.put('/', updateOrdersController);
router.delete('/', deleteOrdersController);
router.post('/paymentIntent', auth, paymentIntentController);
module.exports = router;
