const express = require('express');
const router = express.Router();

const { auth } = require('../auth/auth');
const { registerController } = require('../controllers/merchant/register.controller');
const { loginController } = require('../controllers/merchant/login.controller');
const { resetPasswordController } = require('../controllers/merchant/reset.password.controller');
const { updatePasswordController } = require('../controllers/merchant/update.password.controller');
const { verifyCodeController } = require('../controllers/merchant/verify.code.controller');

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/reset-password', resetPasswordController);
router.post('/update-password', updatePasswordController);
router.post('/verify-code', verifyCodeController);

module.exports = router;
