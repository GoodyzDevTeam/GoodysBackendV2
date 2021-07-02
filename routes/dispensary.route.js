const express = require('express');
const router = express.Router();

const { auth } = require('../auth/auth');
const { getAllDispensariesController } = require('../controllers/dispensary/get.all.dispensary.controller');
const { getFavoriteDispensariesController } = require('../controllers/dispensary/get.favorite.dispensary.controller');
const { toggleFavoriteDispensariesController } = require('../controllers/dispensary/toggle.favorite.dispensary.controller');

router.get('/all', auth, getAllDispensariesController);
router.get('/favorite-dispensaries', auth, getFavoriteDispensariesController);
router.post('/favorite-dispensaries', auth, toggleFavoriteDispensariesController);

module.exports = router;
