const express = require('express');
const router = express.Router();

const { auth } = require('../auth/auth');
const { getAllDealsController } = require('../controllers/deal/get.all.deal.controller');

router.get('/', auth, getAllDealsController);

module.exports = router;
