const express = require('express');
const router = express.Router();

const { auth } = require('../auth/auth');
const { getAllDispensariesController } = require('../controllers/dispensary/get.all.dispensary.controller');
const { getFavoriteDispensariesController } = require('../controllers/dispensary/get.favorite.dispensary.controller');
const { toggleFavoriteDispensariesController } = require('../controllers/dispensary/toggle.favorite.dispensary.controller');
const { getByIdController } = require('../controllers/dispensary/get.by.id.controller');

router.get('/all', getAllDispensariesController);
router.get('/favorite-dispensaries', auth, getFavoriteDispensariesController);
router.post('/favorite-dispensaries', auth, toggleFavoriteDispensariesController);
router.get('/by-id/:dispensaryId', getByIdController);

module.exports = router;
