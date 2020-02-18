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
  suite: {
    type: String,
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
    type: Number,
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
  bairro: {
    type: String,
    required: true
  },
  cidade: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  },
  preco: {
    type: Number
  },
  images: [{
    type: String
  }]
});

module.exports = model('Immobile', ImmobileSchema);