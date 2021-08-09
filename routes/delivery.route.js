const express = require('express');
const router = express.Router();

const { auth } = require('../auth/auth');
const { getAllDeliveriesController } = require('../controllers/delivery/get.all.delivery.controller');

router.get('/', getAllDeliveriesController);

module.exports = router;
