const {Schema, model} = require('../config/database');

const ImmobileSchema = new Schema({
  proprietario: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tamanho: Number,
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

module.exports = model('Immobile', ImmobileSchema);