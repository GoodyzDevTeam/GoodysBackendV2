const express = require('express');
const router = express.Router();

const { auth } = require('../auth/auth');
const { getMenuController } = require('../controllers/menu/get.menu.controller');
const { uploadMenuController } = require('../controllers/menu/upload.menu.controller');

router.get('/', auth, getMenuController);
router.post('/upload', auth, uploadMenuController);

module.exports = router;
