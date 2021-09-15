const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const User = require('../models/user-model');

const mailService = require('./mail-service');
const tokenService = require('./token-service');

const UserDto = require('../dtos/user-dto');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 5000;

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 5000;

class AuthService {
  async signUp({ email, password, username }) {
    const isRegisteredUser = await User.findOne({ email });

    if (isRegisteredUser) {
      throw 'User with this email is already exsist';
    }
    const hash = await bcrypt.hash(password, 10);

    const activationLink = uuid.v4();

    const user = new User({
      email,
      password: hash,
      username,
      activationLink,
    });

    await mailService.sendActivationMail(email, activationLink);

    const userDto = new UserDto(user);

    const { refreshToken, accessToken } = await tokenService.generateToken({
      ...userDto,
    });

    await tokenService.saveToken(userDto.id, refreshToken);

    await user.save();

    return {
      refreshToken,
      accessToken,
      user: userDto,
    };
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

module.exports = new AuthService();
