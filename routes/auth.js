const { Router } = require('express');
const bcrypt = require('bcrypt');

const router = Router();
const User = require('../models/User');

router.post('/users/sign-up', async (req, res) => {
  try {
    const { email, password } = req.body;
    const isRegisteredUser = await User.findOne({ email });
    if (isRegisteredUser) {
      res.status(200).json({ message: 'User with that email is already registered' });
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/users/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: 'This user in nor regustered' });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(400).json({ message: 'Invalid password' });
      return;
    }

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
