const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const User = require('../models/User');

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET_API, {
    expiresIn: 86400,
  });
}

module.exports = {
  async store(req, res) {
    const { email } = req.body;
    try {
      if (await User.findOne({ email }))
        return res.status(400).send({ error: 'Este email já esta foi cadastrado!' });
      const user = await User.create(req.body);

      user.password = undefined;

      return res.json({ user, token: generateToken({ id: user._id }) });
    } catch (err) {
      return res.status(400).send({ error: 'Falha no registro! ' + err });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const users = await User.find({ _id: id }).select('+phone');

      res.status(200).send(users);
    } catch (error) {
      res.status(400).send({ error: error });
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

    res.send({ user, token: generateToken({ id: user._id }) });
  },

  async update(req, res) {
    return res.send('Update');
  },

  async delete(req, res) {
    return res.send('Delete');
  }
}