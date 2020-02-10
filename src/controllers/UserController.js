const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

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

  },

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
      return res.status(400).send({ error: 'Usuário não encontrado' });

    if (!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: 'Senha invalida!' })

    user.password = undefined;

    const token = jwt.sign({ id: user._id }, authConfig.secret, {
      expiresIn: 86400,
    });

    res.send({ user, token });
  }
}