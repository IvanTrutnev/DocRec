const { Router } = require('express');
const { body } = require('express-validator');

const router = Router();

const authController = require('../controllers/auth-controller');

router.post(
  '/sign-up',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  authController.signUp
);

router.post('/sign-in', authController.signIn);

router.get('/activate/:link', authController.activate);

router.post('/logout', authController.logout);

module.exports = router;
