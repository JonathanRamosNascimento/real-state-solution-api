const Immobile = require('../models/Immobile');

module.exports = {
  async index(req, res) {
    try {
      const { tamanho, quarto, suite, banheiro, piso, varanda, garagem, piscina, moveisImbutidos, bairro, cidade, estado } = req.query;
      const immobiles = await Immobile.find({ $and: [{ tamanho: { $gte: tamanho } }, { quarto }, { suite }, { banheiro }, { piso }, { varanda }, { garagem }, { piscina }, { moveisImbutidos }, { bairro }, { cidade }, { estado }] });

      return res.json(immobiles);
    } catch (err) {
      return res.status(400).send({ error: err });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;

      const immobile = await Immobile.find({ _id: id });

      return res.send(immobile);
    } catch (error) {
      return res.status(400).send({ error: err });
    }
  },

  async store(req, res) {
    try {
      const immobile = await Immobile.create(req.body);

      return res.status(201).json(immobile);
    } catch (err) {
      return res.status(400).send({ error: err });
    }
  },

  async update(req, res) {
    return res.send('Update');
  },

  async delete(req, res) {
    return res.send('Delete');
  }
}