const mongoose = require('mongoose').set('useCreateIndex', true);
require('dotenv/config');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;