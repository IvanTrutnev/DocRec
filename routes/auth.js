const { Router } = require('express');

const router = Router();
const User = require('../models/User');

router.post('/users/sign-up', async (req, res) => {
  try {
    const { email, name } = req.body;
    const isRegisteredUser = await User.findOne({ email });

    if (isRegisteredUser) {
      res.status(200).json({ message: 'User with that email is already registered' });
      return;
    }

    const registeredUser = await User.create({ name, email });

    res.status(201).json(registeredUser);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
