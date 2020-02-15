const { Schema, model } = require('../config/database');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  phone: {
    type: Number,
    required: true,
    select: false
  },
  profile: {
    type: String,
    default: 'cliente',
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
})

module.exports = model('User', UserSchema);