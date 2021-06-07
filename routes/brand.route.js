const express = require('express');
const router = express.Router();

const { auth } = require('../auth/auth');
const { getAllBrandsController } = require('../controllers/brand/get.all.brand.controller');

router.get('/', auth, getAllBrandsController);

module.exports = router;
