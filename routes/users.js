const { Router } = require('express');
const userController = require('../controllers/user-controller');

const router = Router();

router.get('/users', userController.getUsers);

module.exports = router;
