const Immobile = require('../models/Immobile');

module.exports = {
  async index(req, res) {
    const { quarto } = req.query;
    const immobiles = await Immobile.find({ quarto });

    return res.json(immobiles);
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