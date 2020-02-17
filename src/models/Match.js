const { Schema, model } = require('../config/database');

const MatchSchema = new Schema({
  name: String,
  phone: Number,
  bairro: String,
  estado: String,
  cidade: String,
  email: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  immobile: {
    type: Schema.Types.ObjectId,
    ref: 'Immobile',
    required: true
  },
});

module.exports = model('Match', MatchSchema);