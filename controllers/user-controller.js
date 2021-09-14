const User = require('../models/user-model');

class UserController {
  async getUsers(_, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
}

module.exports = new UserController();
