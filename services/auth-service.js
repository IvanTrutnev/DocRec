const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const User = require('../models/user-model');

const mailService = require('./mail-service');
const tokenService = require('./token-service');

const UserDto = require('../dtos/user-dto');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 5000;

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 5000;

const ApiError = require('../exceptions/api-error');

class AuthService {
  async signUp({ email, password, username }) {
    const isRegisteredUser = await User.findOne({ email });

    if (isRegisteredUser) {
      throw ApiError.BadRequest('User with this email is already exsist');
    }

    const hash = await bcrypt.hash(password, 10);

    const activationLink = uuid.v4();

    const user = new User({
      email,
      password: hash,
      username,
      activationLink,
    });

    const link = `${process.env.API_URL}/api/activate/${activationLink}`;

    await mailService.sendActivationMail(email, link);

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

  async activate(link) {
    const user = await User.findOne({ activationLink: link });

    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link');
    }

    user.isActivated = true;
    await user.save();
  }

  async signIn({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest('User with this email is already exsist');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw ApiError.BadRequest('Incorrect password');
    }

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

  async logout(req, res, next) {}

  async refresh(req, res, next) {}
}

module.exports = new AuthService();
