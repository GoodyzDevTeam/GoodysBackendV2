const express = require('express');
const router = express.Router();
const multer = require('multer');

const { auth } = require('../auth/auth');
const { getMenuController } = require('../controllers/menu/get.menu.controller');
const { uploadMenuController } = require('../controllers/menu/upload.menu.controller');
const { uploadProductController } = require('../controllers/menu/upload.product.controller');
const { deleteProductController } = require('../controllers/menu/delete.product.controller');
const { editProductController } = require('../controllers/menu/edit.product.controller');

const storage = multer.memoryStorage({
	destination: (req, files, callback) => {
		callback(null, '');
	}
})

const upload = multer();

router.get('/', auth, getMenuController);
router.post('/upload', auth, uploadMenuController);
router.post('/product', upload.any(), uploadProductController);
router.put('/product', upload.any(), editProductController);
router.delete('/product/:mid', auth, deleteProductController);

module.exports = router;
