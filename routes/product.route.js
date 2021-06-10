const express = require('express');
const router = express.Router();

const { auth } = require('../auth/auth');
const { getAllProductsController } = require('../controllers/product/get.all.product.controller');
const { getLikeProductsController } = require('../controllers/product/get.like.product.controller');
const { getAllCategoriesController } = require('../controllers/product/get.all.category.controller');
const { getTopProductsController } = require('../controllers/product/get.top.product.controller');
const { getFeaturedProductsController } = require('../controllers/product/get.featured.product.controller');

router.get('/', auth, getAllProductsController);
router.get('/category', auth, getAllCategoriesController);
router.get('/like-products', auth, getLikeProductsController);
router.get('/top-products', auth, getTopProductsController);
router.get('/featured-products', auth, getFeaturedProductsController);

module.exports = router;
