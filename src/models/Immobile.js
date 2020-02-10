const mongoose = require('mongoose');

const ImmobileSchema = new mongoose.Schema({
  tamamho: Number,
  quarto: Number,
  banheiro: Number,
  piso: String,
  varanda: String,
  garagem: String,
  piscina: String,
  moveisImbutidos: String,
  areaTanque: String,
  sala: String,
  cozinha: String
});

module.exports = mongoose.model('Immobile', ImmobileSchema);