const express = require('express');
const router = express.Router();

const { auth } = require('../auth/auth');
const { getAllDeliveriesController } = require('../controllers/delivery/get.all.delivery.controller');

router.get('/', auth, getAllDeliveriesController);

module.exports = router;
