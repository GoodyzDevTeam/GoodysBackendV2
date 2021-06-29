const express = require('express');
const router = express.Router();

const { auth } = require('../auth/auth');
const { getAllProductsController } = require('../controllers/product/get.all.product.controller');
const { getLikeProductsController } = require('../controllers/product/get.like.product.controller');
const { getAllCategoriesController } = require('../controllers/product/get.all.category.controller');
const { getTopProductsController } = require('../controllers/product/get.top.product.controller');
const { getFeaturedProductsController } = require('../controllers/product/get.featured.product.controller');
const { getProductsByCategoryController } = require('../controllers/product/get.products.by.category.controller');
const { getCategoryController } = require('../controllers/product/get.category.controller');
const { getProductByIdController } = require('../controllers/product/get.product.by.id.controller');

router.get('/', auth, getAllProductsController);
router.get('/by-id/:productId', auth, getProductByIdController);
router.get('/category/all', auth, getAllCategoriesController);
router.get('/category/:categoryId', auth, getCategoryController);
router.get('/by-category/:categoryId', auth, getProductsByCategoryController);
router.get('/like-products', auth, getLikeProductsController);
router.get('/top-products', auth, getTopProductsController);
router.get('/featured-products', auth, getFeaturedProductsController);

module.exports = router;
