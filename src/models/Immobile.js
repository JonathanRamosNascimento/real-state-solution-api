const { Schema, model } = require('../config/database');

const ImmobileSchema = new Schema({
  proprietario: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tamanho: {
    type: Number,
    required: true
  },
  quarto: {
    type: Number,
    required: true
  },
  banheiro: {
    type: Number,
    required: true
  },
  piso: {
    type: String,
    required: true
  },
  varanda: {
    type: String,
    required: true,
  },
  garagem: {
    type: String,
    required: true
  },
  piscina: {
    type: String,
    required: true
  },
  moveisImbutidos: {
    type: String,
    required: true
  },
  areaTanque: {
    type: String,
    required: true
  },
  sala: {
    type: String,
    required: true
  },
  cozinha: {
    type: String,
    required: true
  }
});

module.exports = model('Immobile', ImmobileSchema);