const express = require('express');
const router = express.Router();

const { auth } = require('../auth/auth');
const { loginController } = require('../controllers/account/login.controller');
const { registerController } = require('../controllers/account/register.controller');
const { getAccountController } = require('../controllers/account/get.account.controller');
const { updateAccountController } = require('../controllers/account/update.account.controller');
const { verifyCodeController } = require('../controllers/account/verify.code.controller');
const { resetPasswordController } = require('../controllers/account/reset.password.controller');
const { updatePasswordController } = require('../controllers/account/update.password.controller');

router.post('/login', loginController);
router.post('/register', registerController);
router.get('/my-account', auth, getAccountController);
router.post('/update-profile', auth, updateAccountController);
router.post('/reset-password', resetPasswordController);
router.post('/verify-code', verifyCodeController);
router.post('/update-password', updatePasswordController);

module.exports = router;
