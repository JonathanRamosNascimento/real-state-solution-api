const Match = require('../models/Match');
const Immobile = require('../models/Immobile');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    try {
      const matchs = await Match.find();
      return res.status(200).json(matchs);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  async store(req, res) {
    try {
      const { bairro, cidade, estado, images } = await Immobile.findById(req.body.immobile);
      console.log(images);
      
      var body = { ...req.body, bairro, cidade, estado, images };

      if (body.user !== undefined) {
        const user = await User.findById(req.body.user).select('+phone');

        body = { ...body, name: user.name, email: user.email, phone: user.phone };
      }


      const match = await Match.create(body);

      return res.status(201).json(match);
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const match = await Match.findOne({ _id: id });

      return res.status(200).json(match);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

