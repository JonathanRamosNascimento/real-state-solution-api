const Immobile = require('../models/Immobile');

module.exports = {
  async index(req, res) {
    try {
      const { tamanho, quarto, banheiro, piso, varanda, garagem, piscina, moveisImbutidos, areaTanque, sala, cozinha } = req.query;
      const immobiles = await Immobile.find({ $and: [{ tamanho: { $gte: tamanho } }, { quarto }, { banheiro }, { piso }, { varanda }, { garagem }, { piscina }, { moveisImbutidos }, { areaTanque }, { sala }, { cozinha }] });

      return res.json(immobiles);
    } catch (err) {
      return res.status(400).send({ error: err });
    }
  },

  async store(req, res) {
    const immobile = await Immobile.create(req.body);

    return res.json(immobile);
  },

  async update(req, res) {
    return res.send('Update');
  },

  async delete(req, res) {
    return res.send('Delete');
  }
}