const { validationResult } = require('express-validator');

const authServise = require('../services/auth-service');
const ApiError = require('../exceptions/api-error');

class AuthController {
  async signUp(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const { email, password, username } = req.body;
      const userData = await authServise.signUp({ email, password, username });
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(201).json(userData);
    } catch (e) {
      next(e);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password, username } = req.body;
      const userData = await authServise.signIn({ email, password, username });
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await authServise.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {}

  async refresh(req, res, next) {}
}

module.exports = new AuthController();
