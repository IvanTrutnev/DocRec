const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user-model');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 5000;

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 5000;

class AuthController {
  async signUp(req, res) {
    try {
      const { email, password, username } = req.body;
      const isRegisteredUser = await User.findOne({ email });
      if (isRegisteredUser) {
        res
          .status(200)
          .json({ message: 'User with that email is already registered' });
        return;
      }
      const hash = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hash,
        username,
      });
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).lean();

      if (!user) {
        res.status(400).json({ message: 'This user in nor registered' });
        return;
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        res.status(400).json({ message: 'Invalid password' });
        return;
      }

      const accessToken = jwt.sign({ email, password }, JWT_ACCESS_SECRET, {
        expiresIn: '30m',
      });

      const refreshToken = jwt.sign({ email, password }, JWT_REFRESH_SECRET, {
        expiresIn: '30d',
      });

      res.status(200).json({ ...user, accessToken, refreshToken });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  async logout(req, res, next) {}
  async refresh(req, res, next) {}
}

module.exports = new AuthController();
