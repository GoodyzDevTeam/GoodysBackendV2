const express = require('express');
const router = express.Router();

const { auth } = require('../auth/auth');
const { getAllProductsController } = require('../controllers/product/get.all.product.controller');
const { getLikeProductsController } = require('../controllers/product/get.like.product.controller');
const { getAllCategoriesController } = require('../controllers/product/get.all.category.controller');

router.get('/', auth, getAllProductsController);
router.get('/category', auth, getAllCategoriesController);
router.get('/like-products', auth, getLikeProductsController);

module.exports = router;
