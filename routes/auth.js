const { Router } = require('express');

const router = Router();

const authController = require('../controllers/auth-controller');

router.post('/sign-up', authController.signUp);

router.post('/sign-in', authController.signIn);

router.post('logout', authController.logout);

module.exports = router;
