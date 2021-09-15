const jwt = require('jsonwebtoken');
const Token = require('../models/token-model');

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 5000;

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 5000;
class TokenService {
  async generateToken(payload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });

    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const currentToken = await Token.findOne({ user: userId });

    if (currentToken) {
      currentToken.refreshToken = refreshToken;
      return currentToken.save();
    }

    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }
}

module.exports = new TokenService();
