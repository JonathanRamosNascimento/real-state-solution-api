const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  async store(req, res) {
    const { email } = req.body;
    try {
      if (await User.findOne({ email }))
        return res.status(400).send({ error: 'Este email já esta foi cadastrado!' });
      const user = await User.create(req.body);

      user.password = undefined;

      return res.json({ user });
    } catch (err) {
      return res.status(400).send({ error: 'Falha no registro! ' + err });
    }

  }
}