const express = require('express');
const router = express.Router();

const { auth } = require('../auth/auth');
const { getAllDispensariesController } = require('../controllers/dispensary/get.all.dispensary.controller');
const { getLikeDispensariesController } = require('../controllers/dispensary/get.like.dispensary.controller');

router.get('/', auth, getAllDispensariesController);
router.get('/like-dispensary', auth, getLikeDispensariesController);

module.exports = router;
