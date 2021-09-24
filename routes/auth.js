const { Router } = require('express');

const router = Router();

const authController = require('../controllers/auth-controller');

router.post('/sign-up', authController.signUp);

router.post('/sign-in', authController.signIn);

router.get('/activate/:link', authController.activate);

router.post('/logout', authController.logout);

module.exports = router;
